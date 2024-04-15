import { DeviceRepository } from 'modules/devices/domain/respositories/device-repositoty';
import { getDeviceByIdService } from 'modules/devices/infraestructure/services/get-device-by-id';
import { useAsyncFn } from 'react-use';

export const useGetDeviceById = () => {
  const [{ value: device, loading, error }, getDeviceById] = useAsyncFn<
    DeviceRepository['getDeviceById']
  >(getDeviceByIdService, [getDeviceByIdService]);
  return {
    device,
    loading,
    error,
    getDeviceById,
  };
};
