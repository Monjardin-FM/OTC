import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const deleteAlarmService: AlarmRepository['deleteAlarmType'] = async (
  params,
) => {
  const response = await api().delete(`AlarmType/${params.idAlarmType}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
