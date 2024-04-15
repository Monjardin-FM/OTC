import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { getVictimByIdService } from 'modules/victim/infraestructure/services/get-victim-by-id';
import { useAsyncFn } from 'react-use';

export const useGetVictimById = () => {
  const [{ value: victim, loading, error }, getVictimById] = useAsyncFn<
    VictimRepository['getVictimById']
  >(getVictimByIdService, [getVictimByIdService]);
  return {
    victim,
    loading,
    error,
    getVictimById,
  };
};
