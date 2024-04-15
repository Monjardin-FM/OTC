import React from 'react';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';

export const DeviceForm = () => {
  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6">
      <AppFormField className="col-span-4">
        <AppFormLabel>Device Type</AppFormLabel>
        <AppSelect>
          <option>Select Type Device</option>
        </AppSelect>
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Bracelet</AppFormLabel>
        <AppSelect>
          <option>Device IMEI</option>
        </AppSelect>
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Model</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton>Cancel</AppButton>
        <AppButton colorScheme="primary">Save</AppButton>
      </div>
    </div>
  );
};
