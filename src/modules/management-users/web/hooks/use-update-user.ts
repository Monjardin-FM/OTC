import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { updateUserService } from './../../infraestructure/services/update-user';
import { useAsyncFn } from 'react-use';

export const useUpdateUser = () => {
  const [{ error, loading }, updateUser] = useAsyncFn<
    UserManageRepository['updateUser']
  >(updateUserService, [updateUserService]);
  return {
    updateUser,
    error,
    loading,
  };
};
