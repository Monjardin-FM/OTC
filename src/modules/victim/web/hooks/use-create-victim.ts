import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { saveVictimService } from 'modules/victim/infraestructure/services/create.victim';
import { useAsyncFn } from 'react-use';

export const useSaveVictim = () => {
  const [{ loading, error }, createVictim] = useAsyncFn<
    VictimRepository['createVictim']
  >(saveVictimService, [saveVictimService]);
  return {
    createVictim,
    loading,
    error,
  };
};
