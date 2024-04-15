import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import AppDatePicker from 'presentation/components/AppDatePicker';
export const AddVictimForm = () => {
  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6">
      <AppFormField className="col-span-4">
        <AppFormLabel>Name</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Last Name</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Email</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Case Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Date of Birth</AppFormLabel>
        <AppDatePicker onChange={() => {}} />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Gender</AppFormLabel>
        <AppSelect>
          <option>Select Gender</option>
        </AppSelect>
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Phone Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <div className="grid grid-cols-12 gap-4 col-span-12">
        <AppFormField className="col-span-3">
          <AppFormLabel>Type Address</AppFormLabel>
          <AppSelect>
            <option>Select Type Address</option>
          </AppSelect>
        </AppFormField>
        <AppFormField className="col-span-4">
          <AppFormLabel>Address</AppFormLabel>
          <AppTextField />
        </AppFormField>
        <AppFormField className="col-span-4">
          <AppFormLabel>Password</AppFormLabel>
          <AppTextField />
        </AppFormField>
      </div>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton>Cancel</AppButton>
        <AppButton colorScheme="primary">Save</AppButton>
      </div>
    </div>
  );
};
