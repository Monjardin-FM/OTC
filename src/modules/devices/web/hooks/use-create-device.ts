import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { saveDeviceService } from 'modules/devices/infraestructure/services/create-device';
import { useAsyncFn } from 'react-use';

export const useSaveDevice = () => {
  const [{ loading, error }, createDevice] = useAsyncFn<
    DeviceRepository['createDevice']
  >(saveDeviceService, [saveDeviceService]);
  return {
    createDevice,
    loading,
    error,
  };
};
