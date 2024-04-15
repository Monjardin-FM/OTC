import { Device } from 'modules/devices/domain/entities/device';
import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getDevicesService: DeviceRepository['getDevice'] = async () => {
  const response = await api().get('Device', {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const devices = data.map<Device>((device) => ({
    idDevice: device.idDevice,
    idDeviceType: device.idDeviceType,
    deviceType: device.deviceType,
    description: device.description,
    idStatus: device.idStatus,
  }));
  return devices;
};
