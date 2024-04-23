import { VictimRepository } from 'modules/victim/domain/repositories/victim-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const saveVictimService: VictimRepository['createVictim'] = async (
  params,
) => {
  const response = await api().post('Victim', {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
