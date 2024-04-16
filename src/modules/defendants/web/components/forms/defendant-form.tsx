import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import AppDatePicker from 'presentation/components/AppDatePicker';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
import { useToggle } from 'react-use';
import { DeviceForm } from './device-form';
import { AppDevicessTable } from 'modules/devices/web/components/tables/app-device-table';
import { AddressForm } from './address-form';
import { PhoneForm } from './phone-form';
import { useAutoAnimate } from '@formkit/auto-animate/react';
export const DefendantForm = () => {
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [visiblePhoneForm, setVisiblePhoneForm] = useToggle(false);
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} className="grid grid-cols-12 gap-y-4 gap-x-3">
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
      <div className="col-span-12 flex flex-row items-center justify-start gap-3">
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          onClick={() => {
            setVisibleAddressForm(true);
            setVisibleDeviceForm(false);
            setVisiblePhoneForm(false);
          }}
        >
          New Address
        </AppButton>
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          onClick={() => {
            setVisibleDeviceForm(true);
            setVisibleAddressForm(false);
            setVisiblePhoneForm(false);
          }}
        >
          New Device
        </AppButton>
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          onClick={() => {
            setVisiblePhoneForm(true);
            setVisibleDeviceForm(false);
            setVisibleAddressForm(false);
          }}
        >
          New Phone Number
        </AppButton>
      </div>
      {visibleAddressForm && (
        <div className="col-span-12">
          <AddressForm onClose={() => setVisibleAddressForm(false)} />
        </div>
      )}
      {visibleDeviceForm && (
        <div className="col-span-12">
          <DeviceForm onClose={() => setVisibleDeviceForm(false)} />
        </div>
      )}
      {visiblePhoneForm && (
        <div className="col-span-12">
          <PhoneForm onClose={() => setVisiblePhoneForm(false)} />
        </div>
      )}
      <div className="col-span-12">
        <AppDevicessTable onEdit={() => {}} />
      </div>
    </div>
  );
};
