import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { getDevicesService } from 'modules/devices/infraestructure/services/get-devices';
import { useAsyncFn } from 'react-use';

export const useGetDevices = () => {
  const [{ value: devices, loading, error }, getDevices] = useAsyncFn<
    DeviceRepository['getDevice']
  >(getDevicesService, [getDevicesService]);
  return {
    devices,
    loading,
    error,
    getDevices,
  };
};
