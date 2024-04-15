import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { updateDeviceService } from 'modules/devices/infraestructure/services/update.device';
import { useAsyncFn } from 'react-use';

export const useUpdateDevice = () => {
  const [{ error, loading }, updateDevice] = useAsyncFn<
    DeviceRepository['updateDevice']
  >(updateDeviceService, [updateDeviceService]);
  return {
    updateDevice,
    error,
    loading,
  };
};
