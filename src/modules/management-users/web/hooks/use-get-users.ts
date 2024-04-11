import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { getUsersService } from 'modules/management-users/infraestructure/services/get-users';
import { useAsyncFn } from 'react-use';

export const useGetUsers = () => {
  const [{ value: users, loading, error }, getUsers] = useAsyncFn<
    UserManageRepository['getUsers']
  >(getUsersService, [getUsersService]);
  return {
    users,
    loading,
    error,
    getUsers,
  };
};
