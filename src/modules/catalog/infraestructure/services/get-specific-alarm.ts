import { SpecificAlarm } from 'modules/catalog/domain/entities/specific-alarm';
import { CatalogRepository } from 'modules/catalog/domain/repositories/catalog-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getSpecificAlarmService: CatalogRepository['getSpecificAlarm'] =
  async () => {
    const response = await api().get('Catalog/SpecificAlarmType', {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const specificAlarm = data.map<SpecificAlarm>((data) => ({
      idSpecificAlarmType: data.idSpecificAlarmType,
      specificAlarmType: data.specificAlarmType,
    }));
    return specificAlarm;
  };
