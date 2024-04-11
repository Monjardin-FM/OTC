import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { getGendersService } from 'modules/management-users/infraestructure/services/get-genders';
import { useAsyncFn } from 'react-use';

export const useGetGenders = () => {
  const [{ value: genders, loading, error }, getGenders] = useAsyncFn<
    UserManageRepository['getGender']
  >(getGendersService, [getGendersService]);
  return {
    genders,
    loading,
    error,
    getGenders,
  };
};
