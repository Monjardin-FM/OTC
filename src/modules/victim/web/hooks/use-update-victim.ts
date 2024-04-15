import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { updateVictimService } from 'modules/victim/infraestructure/services/update-victim';
import { useAsyncFn } from 'react-use';

export const useUpdateVictim = () => {
  const [{ error, loading }, updateVictim] = useAsyncFn<
    VictimRepository['updateVictim']
  >(updateVictimService, [updateVictimService]);
  return {
    updateVictim,
    error,
    loading,
  };
};
