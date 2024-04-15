import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const deleteVictimService: VictimRepository['deleteVictim'] = async (
  params,
) => {
  const response = await api().delete(`Victim`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    searchParams: { idPerson: params.idPerson },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
