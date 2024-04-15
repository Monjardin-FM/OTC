import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getVictimByIdService: VictimRepository['getVictimById'] = async (
  params,
) => {
  const response = await api().get(`Victim/id/${params.idPerson}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    json: {
      completeName: params.completeName,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const victims = {
    idDefendant: data.idDefendant,
    idPerson: data.idPerson,
    idOfficer: data.idOfficer,
    name: data.name,
    lastName: data.lasatName,
    idCounty: data.idCounty,
    eMail: data.eMail,
    birthDate: data.birthDate,
    idGender: data.idGender,
    idPersonType: data.idPersonType,
    idStatus: data.idStatus,
    createdAt: data.created_at,
    idRole: data.idRole,
  };
  return victims;
};
