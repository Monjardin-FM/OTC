import { UserManage } from 'modules/management-users/domain/entities/userManage';
import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getUsersService: UserManageRepository['getUsers'] = async (
  params,
) => {
  const response = await api().get('User', {
    headers: {
      Authorization: `Bearer  ${token()}`,
      'Content-Type': 'application/json',
    },
    json: {
      completeName: params.completeName,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const users = data.map<UserManage>((user) => ({
    name: user.name,
    lastName: user.lastName,
    birthDate: user.birthDate,
    idPersonType: user.idPersonType,
    eMail: user.eMail,
    createdAt: user.created_at,
    idCounty: user.idCounty,
    idDefendant: user.idDefendant,
    idGender: user.idGender,
    idOfficer: user.idOfficer,
    idPerson: user.idPerson,
    idRole: user.idRole,
    idStatus: user.idStatus,
  }));
  return users;
};
