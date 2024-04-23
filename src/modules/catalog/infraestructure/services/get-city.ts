import { City } from 'modules/catalog/domain/entities/city';
import { CatalogRepository } from 'modules/catalog/domain/repositories/catalog-repository';
import { api } from 'utils/api';
import { verifyResponse } from 'utils/check-response';
import { token } from 'utils/token';

export const getCityService: CatalogRepository['getCities'] = async () => {
  const response = await api().get('Catalog/City', {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const cities = data.map<City>((city) => ({
    city: city.city,
    idCity: city.idCity,
  }));
  return cities;
};
