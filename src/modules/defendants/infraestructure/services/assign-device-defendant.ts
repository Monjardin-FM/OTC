import { DefendantRepository } from 'modules/defendants/domain/repositories/defendant-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const assignDeviceDefendantService: DefendantRepository['assignDeviceDefendant'] =
  async (params) => {
    const response = await api().post('PersonDevice', {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
