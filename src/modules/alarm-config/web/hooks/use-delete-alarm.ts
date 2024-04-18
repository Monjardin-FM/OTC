import { AlarmRepository } from 'modules/alarm-config/domain/repositories/alarm-repository';
import { deleteAlarmService } from 'modules/alarm-config/infraestructure/services/delete-alarm';
import { useAsyncFn } from 'react-use';

export const useDeleteAlarm = () => {
  const [{ value, error, loading }, deleteAlarm] = useAsyncFn<
    AlarmRepository['deleteAlarmType']
  >(deleteAlarmService, [deleteAlarmService]);
  return {
    value,
    error,
    loading,
    deleteAlarm,
  };
};
