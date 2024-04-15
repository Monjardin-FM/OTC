import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { updateDefendantService } from 'modules/defendants/infraestructure/services/update-defendant';
import { useAsyncFn } from 'react-use';

export const useUpdateDefendant = () => {
  const [{ error, loading }, updateDefendant] = useAsyncFn<
    DefendantRepository['updateDefendant']
  >(updateDefendantService, [updateDefendantService]);
  return {
    updateDefendant,
    error,
    loading,
  };
};
