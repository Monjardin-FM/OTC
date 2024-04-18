import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { updateAlarmService } from 'modules/alarm-config/infraestructure/services/update-alarm';
import { useAsyncFn } from 'react-use';

export const useUpdateAlarm = () => {
  const [{ loading, error }, updateAlarm] = useAsyncFn<
    AlarmRepository['updateAlarm']
  >(updateAlarmService, [updateAlarmService]);
  return {
    updateAlarm,
    loading,
    error,
  };
};
