import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const updateDeviceService: DeviceRepository['updateDevice'] = async (
  params,
) => {
  const response = await api().put('Device', {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
