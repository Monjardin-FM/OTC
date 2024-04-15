import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const saveUserService: UserManageRepository['saveUser'] = async (
  params,
) => {
  const response = await api().post('User', {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
