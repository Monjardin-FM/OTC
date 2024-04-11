import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import AppDatePicker from 'presentation/components/AppDatePicker';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
export const DefendantForm = () => {
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
        <AppFormLabel>SID</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-2">
        <AppFormLabel>Offense</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <div className="col-span-12 grid grid-cols-12 mt-10 gap-3">
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
        <AppFormField className="col-span-3">
          <AppFormLabel>Type Address</AppFormLabel>
          <AppSelect>
            <option>Select Type Address</option>
          </AppSelect>
        </AppFormField>
      </div>
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
