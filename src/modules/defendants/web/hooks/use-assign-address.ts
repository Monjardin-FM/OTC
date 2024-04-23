import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { assignAddressService } from 'modules/defendants/infraestructure/services/assign-address-defendant';
import { useAsyncFn } from 'react-use';

export const useAssignAddress = () => {
  const [{ loading, error }, assignAddress] = useAsyncFn<
    DefendantRepository['assignAddress']
  >(assignAddressService, [assignAddressService]);
  return {
    assignAddress,
    loading,
    error,
  };
};
