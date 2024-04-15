import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { deleteDefendantService } from 'modules/defendants/infraestructure/services/delete.defendant';
import { useAsyncFn } from 'react-use';

export const useDeleteDefendant = () => {
  const [{ value, error, loading }, deleteDefendant] = useAsyncFn<
    DefendantRepository['deleteDefendant']
  >(deleteDefendantService, [deleteDefendantService]);
  return {
    value,
    error,
    loading,
    deleteDefendant,
  };
};
