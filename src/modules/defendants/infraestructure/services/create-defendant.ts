import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const createDefendantService: DefendantRepository['createDefendant'] =
  async (params) => {
    const response = await api().post('Defendant', {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: {
        params,
      },
    });
    await verifyResponse({ response });
  };
