import React, { useEffect } from 'react';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
import { useAssignDeviceDefendant } from '../../hooks/use-assign-device-defendant';
import { Formik } from 'formik';
import { AppToast } from 'presentation/components/AppToast';
import { useGetDeviceType } from 'modules/catalog/hooks/use-get-device-type';

export type DeviceFormProps = {
  onClose: () => void;
  idDefendant?: number;
};
type AssignDeviceFormValues = {
  idDeviceType: number;
  idDevice: number;
  idPerson: number;
};

export const DeviceForm = ({ onClose, idDefendant }: DeviceFormProps) => {
  const { deviceType, getDeviceType } = useGetDeviceType();
  const { assignDeviceDefendant, error: errorSave } =
    useAssignDeviceDefendant();
  const onSubmitHandler = async (data: AssignDeviceFormValues) => {
    await assignDeviceDefendant({
      idDeviceType: Number(data.idDeviceType),
      idDevice: Number(data.idDevice),
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
  }, []);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        idDeviceType: 0,
        idDevice: 0,
        idPerson: 0,
      }}
      onSubmit={onSubmitHandler}
      // validationSchema={validationSchemaSaveDevice}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6 bg-gray-200">
            <AppFormField className="col-span-4">
              <AppFormLabel>Device Type</AppFormLabel>
              <AppSelect
                name="idDeviceType"
                value={values.idDeviceType}
                onChange={handleChange}
              >
                <option>Select device</option>
                {deviceType?.map((device) => (
                  <option key={device.idDeviceType} value={device.idDeviceType}>
                    {device.deviceType}
                  </option>
                ))}
              </AppSelect>
              {/* {errors.idDeviceType && (
                        <AppFormHelperText colorSchema="danger">
                          {errors.idDeviceType}
                        </AppFormHelperText>
                      )} */}
            </AppFormField>
            {/* {values.idDeviceType === 1 && ( */}
            <AppFormField className="col-span-4">
              <AppFormLabel>Bracelet</AppFormLabel>
              <AppSelect>
                <option>Device IMEI</option>
              </AppSelect>
            </AppFormField>
            {/* )} */}
            <AppFormField className="col-span-4">
              <AppFormLabel>Model</AppFormLabel>
              <AppTextField />
            </AppFormField>
            <div className="col-span-12 flex flex-row items-center justify-end gap-4">
              <AppButton onClick={onClose}>Cancel</AppButton>
              <AppButton colorScheme="primary">Save</AppButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
