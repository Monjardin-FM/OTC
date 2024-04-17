import { ResponseDevice } from 'modules/catalog/domain/entities/response-device';
import { CatalogRepository } from 'modules/catalog/domain/repositories/catalog-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getResponseDevicesService: CatalogRepository['getResponseDevices'] =
  async () => {
    const response = await api().get('Catalog/ResponseDevice', {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const responseDevices = data.map<ResponseDevice>((device) => ({
      idResponseDevice: device.idResponseDevice,
      responseDevice: device.responseDevice,
    }));
    return responseDevices;
  };
