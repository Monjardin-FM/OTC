import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const createAlarmService: AlarmRepository['createAlarm'] = async (
  params,
) => {
  const response = await api().post('AlarmType', {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: JSON.stringify(params),
  });
  await verifyResponse({ response });
};
