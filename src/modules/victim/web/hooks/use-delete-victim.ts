import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { deleteVictimService } from 'modules/victim/infraestructure/services/delete-victim';
import { useAsyncFn } from 'react-use';

export const useDeleteVictim = () => {
  const [{ value, error, loading }, deleteVictim] = useAsyncFn<
    VictimRepository['deleteVictim']
  >(deleteVictimService, [deleteVictimService]);
  return {
    value,
    error,
    loading,
    deleteVictim,
  };
};
