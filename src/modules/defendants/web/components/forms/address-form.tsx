import React from 'react';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
export type AddressFormProps = {
  onClose: () => void;
};
export const AddressForm = ({ onClose }: AddressFormProps) => {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <AppFormField className="col-span-3">
        <AppFormLabel>Type Address</AppFormLabel>
        <AppSelect>
          <option>Select Type Address</option>
        </AppSelect>
      </AppFormField>
      <AppFormField className="col-span-3 ">
        <AppFormLabel>Street/Avenue</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-3">
        <AppFormLabel>Phone Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-3">
        <AppFormLabel>Zip Code</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-3">
        <AppFormLabel>City</AppFormLabel>
        <AppSelect>
          <option>Select City</option>
        </AppSelect>
      </AppFormField>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton colorScheme="primary">Save</AppButton>
      </div>
    </div>
  );
};
