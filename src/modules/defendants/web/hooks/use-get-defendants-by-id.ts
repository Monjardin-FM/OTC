import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { getDefendantByIdService } from 'modules/defendants/infraestructure/services/get-defendant-by-id';
import { useAsyncFn } from 'react-use';

export const useGetDefendantsById = () => {
  const [{ value: defendant, loading, error }, getDefendantById] = useAsyncFn<
    DefendantRepository['getDefendantById']
  >(getDefendantByIdService, [getDefendantByIdService]);
  return {
    defendant,
    loading,
    error,
    getDefendantById,
  };
};
