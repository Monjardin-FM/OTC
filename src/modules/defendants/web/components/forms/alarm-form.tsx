import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import { AppCheckbox } from 'presentation/components/AppCheckbox';
import { AppAlarmssTable } from 'modules/alarm-config/web/components/tables/app-alarm-table';
export const AlarmForm = () => {
  return (
    <div className="grid grid-cols-12 col-span-12">
      <div className="flex flex-col items-center justify-start w-full mb-5 col-span-12">
        <AppFormField>
          <AppFormLabel>Automatic Alarms</AppFormLabel>
          <AppCheckbox></AppCheckbox>
        </AppFormField>
      </div>
      <div className="flex flex-col items-start justify-center col-span-12">
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          //   onClick={() => setVisibleDeviceForm(!visibleDeviceForm)}
        >
          New Alarm
        </AppButton>
      </div>
      <div className=" col-span-12 mt-4">
        <AppAlarmssTable onEdit={() => {}} />
      </div>
    </div>
  );
};
