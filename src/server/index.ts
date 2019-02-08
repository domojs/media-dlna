import * as akala from '@akala/server';
import * as upnp from '@domojs/upnp'
import * as sd from '@domojs/service-discovery'
import * as media from '@domojs/media'
import { Client, Connection } from '@akala/json-rpc-ws';
import { v10 } from './avtransport';

const log = akala.logger;

akala.injectWithNameAsync(['$isModule', '$agent.api/zeroconf', '$agent.api/media'], function (isModule: akala.worker.IsModule, zeroconfClient: Client<Connection>, mediaClient: Client<Connection>)
{
    var players: { [id: string]: v10.Service } = {};
    if (isModule('@domojs/media-dlna'))
    {
        var timers: { [id: string]: NodeJS.Timer } = {};
        function startTimer(id: string)
        {
            if (timers[id])
                return;
            timers[id] = setInterval(function ()
            {
                client.status({ target: id });
            }, 1000)
        }

        function stopTimer(id: string)
        {
            if (timers[id])
                clearInterval(timers[id]);
            timers[id] = null;
        }


        var client = akala.api.jsonrpcws(media.player).createClient(mediaClient, {
            mute(p)
            {
            },
            async status(p)
            {
                await players[p.identity].GetPositionInfo();
                var state: 'stopped' | 'paused' | 'playing';
                switch (players[p.identity].TransportState)
                {
                    case 'NO_MEDIA_PRESENT':
                    case 'STOPPED':
                    case 'TRANSITIONING':
                        client.$proxy().status({
                            identity: p.identity,
                            state: 'stopped',
                        });
                        stopTimer(p.identity);
                        return;
                    case 'PAUSED_PLAYBACK':
                        state = 'paused';
                        break;
                    case 'PLAYING':
                        state = 'playing';
                        break;
                }
                log.verbose(players[p.identity]);
                return client.$proxy().status({
                    identity: p.identity,
                    state: state,
                    position: Number(players[p.identity].RelativeTimePosition) / 100,
                });
            },
            async next(p)
            {
                await players[p.target].Next();
            },
            async previous(p)
            {
                await players[p.target].Previous();
            },
            async pause(p)
            {
                if (players[p.target].TransportState == 'PAUSED_PLAYBACK')
                    await players[p.target].Play();
                else
                    await players[p.target].Pause();
                await players[p.target].GetTransportInfo()
                if (players[p.target].TransportState == 'PLAYING')
                    startTimer(p.target);
                else
                    stopTimer(p.target);
            },
            async stop(p)
            {
                await players[p.target].Stop();
                await players[p.target].GetTransportInfo()
                stopTimer(p.target);
            },
            async play(p)
            {
                var media = p.media;
                log.info(media);
                if (typeof (media) != 'undefined')
                {
                    if (!media || isNaN(Number(media.path)))
                    {
                        media.path = decodeURIComponent(media.path);
                        media.path = media.path.replace(/file:\/\/\/\/\//, 'smb://');
                        log.verbose(media);
                        if (players[p.target].AVTransportURI)
                        {
                            players[p.target].NextAVTransportURI = media.path;
                            await players[p.target].SetNextAVTransportURI();
                        }
                        else
                        {
                            players[p.target].AVTransportURI = media.path;
                            await players[p.target].SetAVTransportURI();
                            players[p.target].Play();
                            startTimer(p.target);
                        }
                    }
                    else
                    {
                        players[p.target].Play();
                    }
                }
                else
                    this.pause();
            }
        });

        akala.api.jsonrpcws(sd.meta).createClient(zeroconfClient, {
            add(service: upnp.Service)
            {
                var player = players[service.headers.USN] = new v10.Service(service.type);
                player.A_ARG_TYPE_InstanceID = 0;
                client.$proxy().registerPlayer({ identity: service.headers.USN as string, name: service.name, icons: service.icons });
            },
            delete(service: upnp.Service)
            {
                client.$proxy().unregisterPlayer({ identity: service.headers.USN as string, name: service.name, icons: null });
                delete players[service.headers.USN];
            }
        }).$proxy().notify({ type: 'urn:schemas-upnp-org:service:AVTransport:1' })
    }
})