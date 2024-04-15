import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { getVictimsService } from 'modules/victim/infraestructure/services/get-victims';
import { useAsyncFn } from 'react-use';

export const useGetVictims = () => {
  const [{ value: victims, loading, error }, getVictims] = useAsyncFn<
    VictimRepository['getVictim']
  >(getVictimsService, [getVictimsService]);
  return {
    victims,
    loading,
    error,
    getVictims,
  };
};
