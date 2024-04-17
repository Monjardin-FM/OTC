import { DeviceType } from '../entities/device-type';
import { ResponseDevice } from '../entities/response-device';

export type CatalogRepository = {
  getResponseDevices(): Promise<ResponseDevice[]>;
  getDeviceType(): Promise<DeviceType[]>;
};
