import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { getRolesService } from 'modules/management-users/infraestructure/services/get-roles';
import { useAsyncFn } from 'react-use';

export const useGetRoles = () => {
  const [{ value: roles, loading, error }, getRoles] = useAsyncFn<
    UserManageRepository['getRole']
  >(getRolesService, [getRolesService]);
  return {
    roles,
    loading,
    error,
    getRoles,
  };
};
