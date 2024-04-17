import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { getAlarmsService } from 'modules/alarm-config/infraestructure/services/get-alarm';
import { useAsyncFn } from 'react-use';

export const useGetAlarms = () => {
  const [{ value: alarms, loading, error }, getAlarms] = useAsyncFn<
    AlarmRepository['getAlarms']
  >(getAlarmsService, [getAlarmsService]);
  return {
    alarms,
    loading,
    error,
    getAlarms,
  };
};
