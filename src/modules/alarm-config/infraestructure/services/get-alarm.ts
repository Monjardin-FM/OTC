import { Alarm } from 'modules/alarm-config/domain/entities/alarms';
import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getAlarmsService: AlarmRepository['getAlarms'] = async () => {
  const response = await api().get('AlarmType', {
    headers: {
      Authorization: `Bearer ${token()}`,
      //   'Content-Type': 'application/json',
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const alarms = data.map<Alarm>((alarm) => ({
    idAlarmType: alarm.idAlarmType,
    description: alarm.description,
    automatic: alarm.automatic,
    responseInterval: alarm.responseInterval,
    geocordinateTimeout: alarm.geocordinateTimeout,
    dynamicDistance: alarm.dynamicDistance,
    enableResponseCall: alarm.enableResponseCall,
    resolveTime: alarm.resolveTime,
    callText: alarm.callText,
    smsText: alarm.smsText,
    mailText: alarm.mailText,
    idStatus: alarm.idStatus,
  }));
  return alarms;
};
