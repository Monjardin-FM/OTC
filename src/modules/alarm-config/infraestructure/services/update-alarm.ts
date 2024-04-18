import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const updateAlarmService: AlarmRepository['updateAlarm'] = async (
  params,
) => {
  const response = await api().put('AlarmType', {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
