import { Gender } from 'modules/management-users/domain/entities/gender';
import { UserManageRepository } from 'modules/management-users/domain/repositories/user-manage-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getGendersService: UserManageRepository['getGender'] =
  async () => {
    const response = await api().get('Catalog/Gender', {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const genders = data.map<Gender>((gender) => ({
      idGender: gender.idGender,
      gender: gender.gender,
    }));
    return genders;
  };
