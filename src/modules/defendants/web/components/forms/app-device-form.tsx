import React, { useEffect, useState } from 'react';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
import { useAssignDeviceDefendant } from '../../hooks/use-assign-device-defendant';
import { AppToast } from 'presentation/components/AppToast';
import { useGetDeviceType } from 'modules/catalog/hooks/use-get-device-type';
import { DeviceType } from 'modules/catalog/domain/entities/device-type';
import { useGetDevices } from 'modules/devices/web/hooks/use-get-devices';
import Select from 'react-select';

export type DeviceFormProps = {
  onClose: () => void;
  idDefendant?: number;
};

export const DeviceForm = ({ onClose, idDefendant }: DeviceFormProps) => {
  const { deviceType, getDeviceType } = useGetDeviceType();
  const [deviceTypeOptions, setDeviceTypeOptions] = useState<DeviceType[]>();
  const { assignDeviceDefendant, error: errorSave } =
    useAssignDeviceDefendant();
  const [idDeviceType, setIdDeviceType] = useState<number>();
  const [idDevice, setIdDevice] = useState<number>();
  const { devices, getDevices } = useGetDevices();
  const [devicesOptions, setDevicesOptions] =
    useState<{ value: number; label: string }[]>();

  console.log(setIdDevice);
  const onSubmitHandler = async () => {
    await assignDeviceDefendant({
      idDeviceType: Number(idDeviceType),
      idDevice: Number(idDevice),
      idPerson: Number(idDefendant),
    });

    if (!errorSave) {
      AppToast().fire({
        title: 'Success',
        text: 'Information saved successfully',
        icon: 'success',
      });
    }
    onClose();
    // onReload();
  };
  useEffect(() => {
    getDeviceType();
    getDevices({ completeName: '' });
  }, []);
  useEffect(() => {
    if (deviceType) {
      const deviceTypeFiltered = deviceType.filter(
        (item) => item.idDeviceType === 1,
      );
      setDeviceTypeOptions(deviceTypeFiltered);
    }
    if (devices) {
      const filteredDevices = devices.filter((item) => item.idDeviceType === 1);
      setDevicesOptions(
        filteredDevices.map((item) => ({
          value: item.idDevice,
          label: item.description,
        })),
      );
    }
  }, [deviceType, devices]);
  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <AppFormField className="col-span-4">
        <AppFormLabel>Device Type</AppFormLabel>
        <AppSelect
          name="idDeviceType"
          value={idDeviceType}
          onChange={(e) => setIdDeviceType(Number(e.target.value))}
        >
          <option value={0}>Select device</option>
          {deviceTypeOptions?.map((device) => (
            <option key={device.idDeviceType} value={device.idDeviceType}>
              {device.deviceType}
            </option>
          ))}
        </AppSelect>
      </AppFormField>
      {idDeviceType !== 0 ? (
        <>
          {idDeviceType === 1 ? (
            <AppFormField className="col-span-4">
              <AppFormLabel>Bracelet</AppFormLabel>
              <Select
                options={devicesOptions}
                isSearchable={true}
                onChange={(e) => setIdDevice(e?.value)}
              />
            </AppFormField>
          ) : (
            <AppFormField className="col-span-4">
              <AppFormLabel>Model</AppFormLabel>
              <AppTextField />
            </AppFormField>
          )}
        </>
      ) : (
        ''
      )}
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton
          colorScheme="primary"
          onClick={() => {
            onSubmitHandler();
          }}
          isDisabled={idDeviceType === 0 || idDevice === 0 || !idDefendant}
        >
          Save
        </AppButton>
      </div>
    </div>
  );
};
