import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppAlarmssTable } from 'modules/alarm-config/web/components/tables/app-alarm-table';
import { useToggle } from 'react-use';
import { AddAlarmForm } from './add-alarm-form';
export const AlarmForm = () => {
  const [visibleAlarmForm, setVisibleAlarmForm] = useToggle(false);
  return (
    <div className="grid grid-cols-12 col-span-12 gap-4">
      <div className="flex flex-col items-start justify-center col-span-12">
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          onClick={() => setVisibleAlarmForm(true)}
        >
          New Alarm
        </AppButton>
      </div>
      {visibleAlarmForm && (
        <div className="col-span-12 grid grid-cols-12">
          <AddAlarmForm onClose={() => setVisibleAlarmForm(false)} />
        </div>
      )}
      <div className=" col-span-12">
        <AppAlarmssTable onEdit={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
};
