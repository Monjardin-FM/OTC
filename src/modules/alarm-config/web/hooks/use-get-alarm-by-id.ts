import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { getAlarmByIdService } from 'modules/alarm-config/infraestructure/services/get-alarm-by-id';
import { useAsyncFn } from 'react-use';

export const useGetAlarmById = () => {
  const [{ value: alarm, loading, error }, getAlarmById] = useAsyncFn<
    AlarmRepository['getAlarmById']
  >(getAlarmByIdService, [getAlarmByIdService]);
  return {
    alarm,
    loading,
    error,
    getAlarmById,
  };
};
