import * as akala from '@akala/server'

export namespace v1
{
    export enum TransportState
    {
        //Mandatory
        Stopped = 'STOPPED',
        Playing = 'PLAYING',
        //Optional
        Transitionning = 'TRANSITIONNING',
        PausedPlayback = 'PAUSED PLAYBACK',
        PausedRecording = 'PAUSED RECORDING',
        Recording = 'RECORDING',
        NoMediaPresent = 'NO MEDIA PRESENT'
    }
    export enum TransportStatus
    {
        Ok = 'OK',
        Error = 'ERROR OCCURRED'
    }

    export enum PlaybackStorageMedium
    {
        Unkown = 'UNKNOWN',
        DV = 'DV',
        MiniDV = 'MINI-DV',
        VHS = 'VHS',
        WVS = 'W-VS',
        SVHS = 'S-VHS',
        DVHS = 'D-VHS',
        VHSC = 'VHSC',
        VIDE8 = 'VIDE8',
        HI8 = 'HI8',
        CDOM = 'CD-OM',
        CDDA = 'CD-DA',
        CDR = 'CD-R',
        VIDEOCD = 'VIDEOCD',
        SACD = 'SACD',
        MDADIO = 'MD-ADIO',
        MDPICTURE = 'MD-PICTUE',
        DVDROM = 'DVD-ROM',
        DVDVIDEO = 'DVD-VIDO',
        DVDMinusR = 'DVD-R',
        DVDPlusR = 'DVD+R',
        DVDRW = 'DVD-RW',
        DVDRA = 'DVD-RA',
        DVDAUDO = 'DVD-AUDO',
        DAT = 'DAT',
        LD = 'LD',
        HD = 'HD',
        MICOMV = 'MICO-MV',
        NETWORK = 'NETWORK',
        NONE = 'NONE',
        NotImplemtented = 'NOT_IMPLEMENTED'
    }

    export enum CurrentPlayMode
    {
        Normal = 'NORMAL',
        Shuffle = 'SHUFFLE',
        RepeatOne = 'REPEAT_ONE',
        RepeatAll = 'REPEAT_ALL',
        Random = 'RANDOM',
        Direct1 = 'DIRECT_1',
        Intro = 'INTRO'
    }

    export enum RecordMediumWriteStatus
    {
        Writable = 'WRITABLE',
        Protected = 'PROTECTED',
        NotWritable = 'NOT_WRITABLE',
        Unknown = 'UNKNOWN',
        NotImplemtented = 'NOT_IMPLEMENTED'
    }

    export enum CurrentRecordQualityMode
    {
        EP = '0:EP',
        LP = '1:LP',
        SP = '2:SP',
        Basic = '0:BASIC',
        Medium = '1:MEDIUM',
        High = '2:HIGH',
        NotImplemtented = 'NOT_IMPLEMENTED',
    }

    export enum SeekMode
    {
        TrackNr = 'TRACK_NR',
        AbsTime = 'ABS_TIME',
        RelTime = 'REL_TIME',
        AbsCount = 'ABS_COUNT',
        RelCount = 'REL_COUNT',
        ChannelFreqency = 'CHANNEL_FREQ',
        TapeIndex = 'TAPE-INDEX',
        Frame = 'FRAME'
    }

    export class Actions
    {
        SetAVTransportURI(InstanceId: string, uri: string, metadata?: string)
        {
            var http: akala.Http = akala.resolve('$http');
            // http.invokeSOAP('')
        };
        // SetNextAVTransportURI();
        // GetMediaInfo();
        // GetTransportInto();
        // GetPositionInfo();
        // GetDeviceCapabilities();
        // GetTransportSettings();
        // Stop();
        // Play();
        // Pause();
        // Record();
        // Seek();
        // Next();
        // Previous();
        // SetPlayMode();
        // SetRecordQualityMode();
        // GetCurrentTransportAction();
    }
}