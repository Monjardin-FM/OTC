import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { deleteUserService } from 'modules/management-users/infraestructure/services/delete-user';
import { useAsyncFn } from 'react-use';

export const useDeleteUser = () => {
  const [{ value, error, loading }, deleteUser] = useAsyncFn<
    UserManageRepository['deleteUser']
  >(deleteUserService, [deleteUserService]);
  return {
    value,
    error,
    loading,
    deleteUser,
  };
};
