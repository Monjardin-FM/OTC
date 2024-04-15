import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { getUserByIdService } from 'modules/management-users/infraestructure/services/get-user-by-id';
import { useAsyncFn } from 'react-use';

export const useGetUserById = () => {
  const [{ value: user, loading, error }, getUserById] = useAsyncFn<
    UserManageRepository['getUserById']
  >(getUserByIdService, [getUserByIdService]);
  return {
    user,
    loading,
    error,
    getUserById,
  };
};
