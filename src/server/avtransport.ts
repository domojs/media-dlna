import { EventEmitter } from 'events'
import * as akala from '@akala/core'
import * as xml2js from 'xml2js'
import {promisify} from 'util'
const parseXml=promisify(xml2js.parseString)

export namespace v10
{
export type i4=number;
export type ui4=number;
export type CurrentPlayMode= 'NORMAL' | 'REPEAT_ONE' | 'REPEAT_ALL' | 'SHUFFLE' | 'SHUFFLE_NOREPEAT'
export type RecordStorageMedium= 'NOT_IMPLEMENTED'
export type LastChange= string
export type RelativeTimePosition= string
export type CurrentTrackURI= string
export type CurrentTrackDuration= string
export type CurrentRecordQualityMode= 'NOT_IMPLEMENTED'
export type CurrentMediaDuration= string
export type AbsoluteCounterPosition= i4
export type RelativeCounterPosition= i4
export type A_ARG_TYPE_InstanceID= ui4
export type AVTransportURI= string
export type TransportState= 'STOPPED' | 'PAUSED_PLAYBACK' | 'PLAYING' | 'TRANSITIONING' | 'NO_MEDIA_PRESENT'
export type CurrentTrackMetaData= string
export type NextAVTransportURI= string
export type PossibleRecordQualityModes= 'NOT_IMPLEMENTED'
export type CurrentTrack= ui4
export type AbsoluteTimePosition= string
export type NextAVTransportURIMetaData= string
export type PlaybackStorageMedium= 'NONE' | 'UNKNOWN' | 'CD-DA' | 'HDD' | 'NETWORK'
export type CurrentTransportActions= string
export type RecordMediumWriteStatus= 'NOT_IMPLEMENTED'
export type PossiblePlaybackStorageMedia= 'NONE' | 'UNKNOWN' | 'CD-DA' | 'HDD' | 'NETWORK'
export type AVTransportURIMetaData= string
export type NumberOfTracks= ui4
export type A_ARG_TYPE_SeekMode= 'REL_TIME' | 'TRACK_NR'
export type A_ARG_TYPE_SeekTarget= string
export type PossibleRecordStorageMedia= 'NOT_IMPLEMENTED'
export type TransportStatus= 'OK' | 'ERROR_OCCURRED'
export type TransportPlaySpeed= '1'
export class Service extends EventEmitter {

public constructor(private $serviceType:string){ super(); }
public CurrentPlayMode: CurrentPlayMode='NORMAL';
public RecordStorageMedium: RecordStorageMedium;
public LastChange: LastChange;
public RelativeTimePosition: RelativeTimePosition;
public CurrentTrackURI: CurrentTrackURI;
public CurrentTrackDuration: CurrentTrackDuration;
public CurrentRecordQualityMode: CurrentRecordQualityMode;
public CurrentMediaDuration: CurrentMediaDuration;
public AbsoluteCounterPosition: AbsoluteCounterPosition;
public RelativeCounterPosition: RelativeCounterPosition;
public A_ARG_TYPE_InstanceID: A_ARG_TYPE_InstanceID;
public AVTransportURI: AVTransportURI;
public TransportState: TransportState;
public CurrentTrackMetaData: CurrentTrackMetaData;
public NextAVTransportURI: NextAVTransportURI;
public PossibleRecordQualityModes: PossibleRecordQualityModes;
public CurrentTrack: CurrentTrack;
public AbsoluteTimePosition: AbsoluteTimePosition;
public NextAVTransportURIMetaData: NextAVTransportURIMetaData;
public PlaybackStorageMedium: PlaybackStorageMedium;
public CurrentTransportActions: CurrentTransportActions;
public RecordMediumWriteStatus: RecordMediumWriteStatus;
public PossiblePlaybackStorageMedia: PossiblePlaybackStorageMedia;
public AVTransportURIMetaData: AVTransportURIMetaData;
public NumberOfTracks: NumberOfTracks;
public A_ARG_TYPE_SeekMode: A_ARG_TYPE_SeekMode;
public A_ARG_TYPE_SeekTarget: A_ARG_TYPE_SeekTarget;
public PossibleRecordStorageMedia: PossibleRecordStorageMedia;
public TransportStatus: TransportStatus;
public TransportPlaySpeed: TransportPlaySpeed;
public async GetCurrentTransportActions(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetCurrentTransportActions", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.CurrentTransportActions=xmlResponse.Envelope.Body[0].GetCurrentTransportActionsResponse.Actions[0]
}
public async GetDeviceCapabilities(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetDeviceCapabilities", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.PossiblePlaybackStorageMedia=xmlResponse.Envelope.Body[0].GetDeviceCapabilitiesResponse.PlayMedia[0]
this.PossibleRecordStorageMedia=xmlResponse.Envelope.Body[0].GetDeviceCapabilitiesResponse.RecMedia[0]
this.PossibleRecordQualityModes=xmlResponse.Envelope.Body[0].GetDeviceCapabilitiesResponse.RecQualityModes[0]
}
public async GetMediaInfo(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetMediaInfo", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.NumberOfTracks=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.NrTracks[0]
this.CurrentMediaDuration=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.MediaDuration[0]
this.AVTransportURI=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.CurrentURI[0]
this.AVTransportURIMetaData=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.CurrentURIMetaData[0]
this.NextAVTransportURI=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.NextURI[0]
this.NextAVTransportURIMetaData=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.NextURIMetaData[0]
this.PlaybackStorageMedium=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.PlayMedium[0]
this.RecordStorageMedium=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.RecordMedium[0]
this.RecordMediumWriteStatus=xmlResponse.Envelope.Body[0].GetMediaInfoResponse.WriteStatus[0]
}
public async GetPositionInfo(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetPositionInfo", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.CurrentTrack=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.Track[0]
this.CurrentTrackDuration=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.TrackDuration[0]
this.CurrentTrackMetaData=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.TrackMetaData[0]
this.CurrentTrackURI=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.TrackURI[0]
this.RelativeTimePosition=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.RelTime[0]
this.AbsoluteTimePosition=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.AbsTime[0]
this.RelativeCounterPosition=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.RelCount[0]
this.AbsoluteCounterPosition=xmlResponse.Envelope.Body[0].GetPositionInfoResponse.AbsCount[0]
}
public async GetTransportInfo(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetTransportInfo", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.TransportState=xmlResponse.Envelope.Body[0].GetTransportInfoResponse.CurrentTransportState[0]
this.TransportStatus=xmlResponse.Envelope.Body[0].GetTransportInfoResponse.CurrentTransportStatus[0]
this.TransportPlaySpeed=xmlResponse.Envelope.Body[0].GetTransportInfoResponse.CurrentSpeed[0]
}
public async GetTransportSettings(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "GetTransportSettings", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
this.CurrentPlayMode=xmlResponse.Envelope.Body[0].GetTransportSettingsResponse.PlayMode[0]
this.CurrentRecordQualityMode=xmlResponse.Envelope.Body[0].GetTransportSettingsResponse.RecQualityMode[0]
}
public async Next(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Next", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async Pause(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Pause", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async Play(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Play", {
InstanceID: this.A_ARG_TYPE_InstanceID
, Speed: this.TransportPlaySpeed
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async Previous(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Previous", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async Seek(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Seek", {
InstanceID: this.A_ARG_TYPE_InstanceID
, Unit: this.A_ARG_TYPE_SeekMode
, Target: this.A_ARG_TYPE_SeekTarget
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async SetAVTransportURI(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "SetAVTransportURI", {
InstanceID: this.A_ARG_TYPE_InstanceID
, CurrentURI: this.AVTransportURI
, CurrentURIMetaData: this.AVTransportURIMetaData
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async SetNextAVTransportURI(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "SetNextAVTransportURI", {
InstanceID: this.A_ARG_TYPE_InstanceID
, NextURI: this.NextAVTransportURI
, NextURIMetaData: this.NextAVTransportURIMetaData
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async SetPlayMode(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "SetPlayMode", {
InstanceID: this.A_ARG_TYPE_InstanceID
, NewPlayMode: this.CurrentPlayMode
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
public async Stop(
){
var http:akala.Http=akala.resolve('$http');
var result=await http.invokeSOAP(this.$serviceType, "Stop", {
InstanceID: this.A_ARG_TYPE_InstanceID
} as any)
var xmlResponse= await parseXml(await result.text(), { async: true });
}
}
}
