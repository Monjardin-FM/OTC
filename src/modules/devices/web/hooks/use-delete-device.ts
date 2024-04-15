import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { deleteDeviceService } from 'modules/devices/infraestructure/services/delete-device';
import { useAsyncFn } from 'react-use';

export const useDeleteDevice = () => {
  const [{ value, error, loading }, deleteDevice] = useAsyncFn<
    DeviceRepository['deleteDevice']
  >(deleteDeviceService, [deleteDeviceService]);
  return {
    value,
    error,
    loading,
    deleteDevice,
  };
};
