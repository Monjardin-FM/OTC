import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { saveUserService } from 'modules/management-users/infraestructure/services/save-user';
import { useAsyncFn } from 'react-use';

export const useSaveUser = () => {
  const [{ loading, error }, createUser] = useAsyncFn<
    UserManageRepository['saveUser']
  >(saveUserService, [saveUserService]);
  return {
    createUser,
    loading,
    error,
  };
};
