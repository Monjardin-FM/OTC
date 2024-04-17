import { Alarm } from '../entities/alarms';

export type AlarmRepository = {
  getAlarms(): Promise<Alarm[]>;
  createAlarm(params: {
    lResponseDevice: { idResponseDevice: number }[];
    lAssignedDevice: { idDeviceType: number }[];
    description: string;
    automatic: boolean;
    responseInterval: number;
    geocordinateTimeout: number;
    dynamicDistance: number;
    enableResponseCall: boolean;
    resolveTime: number;
    callText: string;
    smsText: string;
    mailText: string;
    idStatus: number;
  }): Promise<void>;
  updateAlarm(params: {
    idAlarmType: number;
    lResponseDevice: { idResponseDevice: number }[];
    lAssignedDevice: { idDeviceType: number }[];
    description: string;
    automatic: boolean;
    responseInterval: number;
    geocordinateTimeout: number;
    dynamicDistance: number;
    enableResponseCall: boolean;
    resolveTime: number;
    callText: string;
    smsText: string;
    mailText: string;
    idStatus: number;
  }): Promise<void>;
  deleteAlarmType(params: { idAlarmType: number }): Promise<Boolean>;
};
