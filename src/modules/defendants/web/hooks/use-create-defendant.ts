import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { createDefendantService } from 'modules/defendants/infraestructure/services/create-defendant';
import { useAsyncFn } from 'react-use';

export const useCreateDefendant = () => {
  const [{ value, loading, error }, createDefendant] = useAsyncFn<
    DefendantRepository['createDefendant']
  >(createDefendantService, [createDefendantService]);
  return {
    value,
    createDefendant,
    loading,
    error,
  };
};
