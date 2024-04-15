import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const deleteDefendantService: DefendantRepository['deleteDefendant'] =
  async (params) => {
    const response = await api().delete(`Defendant`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      searchParams: { idPerson: params.idPerson },
    });
    const { body } = await verifyResponse({ response });
    return body.data.result;
  };
