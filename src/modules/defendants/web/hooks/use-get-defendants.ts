import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { getDefendantsService } from 'modules/defendants/infraestructure/services/get-defendant';
import { useAsyncFn } from 'react-use';

export const useGetDefendants = () => {
  const [{ value: defendants, loading, error }, getDefendants] = useAsyncFn<
    DefendantRepository['getDefendant']
  >(getDefendantsService, [getDefendantsService]);
  return {
    defendants,
    loading,
    error,
    getDefendants,
  };
};
