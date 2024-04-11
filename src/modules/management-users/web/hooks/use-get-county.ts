import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { getCountyService } from 'modules/management-users/infraestructure/services/get-county';
import { useAsyncFn } from 'react-use';

export const useGetCounties = () => {
  const [{ value: counties, loading, error }, getCounties] = useAsyncFn<
    UserManageRepository['getCounty']
  >(getCountyService, [getCountyService]);
  return {
    counties,
    loading,
    error,
    getCounties,
  };
};
