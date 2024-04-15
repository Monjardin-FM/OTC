import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getDeviceByIdService: DeviceRepository['getDeviceById'] = async (
  params,
) => {
  const response = await api().get(`Device/id/${params.idDevice}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const device = {
    idDevice: data.idDevice,
    idDeviceType: data.idDeviceType,
    deviceType: data.deviceType,
    description: data.description,
    idStatus: data.idStatus,
  };
  return device;
};
