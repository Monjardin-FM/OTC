import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import AppDatePicker from 'presentation/components/AppDatePicker';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
export const VictimForm = () => {
  return (
    <div className="grid grid-cols-12 gap-y-4 gap-x-3">
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
      <AppFormField className="col-span-2">
        <AppFormLabel>Case Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Date of Birth</AppFormLabel>
        <AppDatePicker onChange={() => {}} />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Gender</AppFormLabel>
        <AppSelect>
          <option value="">Select Gender</option>
        </AppSelect>
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Phone Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Address</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Work Address</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Password</AppFormLabel>
        <AppTextField />
      </AppFormField>

      <div className="col-span-2 flex flex-col items-center justify-center">
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
        >
          New Device
        </AppButton>
      </div>
      {/* <AppFormField className="col-span-6">
          <AppFormLabel>Status</AppFormLabel>
          <div className="flex flex-row items-center justify-center gap-5">
            <span>Inactive</span>
            <span>Active</span>
          </div>
        </AppFormField> */}
    </div>
  );
};
