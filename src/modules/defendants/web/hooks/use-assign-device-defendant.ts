import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { assignDeviceDefendantService } from 'modules/defendants/infraestructure/services/assign-device-defendant';
import { useAsyncFn } from 'react-use';

export const useAssignDeviceDefendant = () => {
  const [{ loading, error }, assignDeviceDefendant] = useAsyncFn<
    DefendantRepository['assignDeviceDefendant']
  >(assignDeviceDefendantService, [assignDeviceDefendantService]);
  return {
    assignDeviceDefendant,
    loading,
    error,
  };
};
