import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { createAlarmService } from 'modules/alarm-config/infraestructure/services/post-alarm';
import { useAsyncFn } from 'react-use';

export const useCreateAlarm = () => {
  const [{ loading, error }, createAlarm] = useAsyncFn<
    AlarmRepository['createAlarm']
  >(createAlarmService, [createAlarmService]);
  return {
    createAlarm,
    loading,
    error,
  };
};
