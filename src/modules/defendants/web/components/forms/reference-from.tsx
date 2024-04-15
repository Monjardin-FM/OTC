import React from 'react';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import { AppButton } from 'presentation/components/AppButton';
export const ReferenceForm = () => {
  return (
    <div className="grid grid-cols-12 gap-4 ">
      <AppFormField className="col-span-4 ">
        <AppFormLabel>Name</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4 ">
        <AppFormLabel>Relationship</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4 ">
        <AppFormLabel>Address</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <AppFormField className="col-span-4 ">
        <AppFormLabel>Phone Number</AppFormLabel>
        <AppTextField />
      </AppFormField>
      <div className="col-span-12">
        <AppButton colorScheme="primary">Add</AppButton>
      </div>
    </div>
  );
};
