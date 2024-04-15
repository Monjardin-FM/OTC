import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { useToggle } from 'react-use';
import { AppVictimssTable } from 'modules/victim/web/components/app-victim-table';
import { AddVictimForm } from './app-add-victim-form';
export const VictimForm = () => {
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  return (
    <>
      <div className="flex flex-col items-start justify-center">
        <AppButton
          colorScheme="primary"
          leftIcon={<Icon.PlusCircle size={18} />}
          onClick={() => setVisibleDeviceForm(!visibleDeviceForm)}
        >
          New Victim
        </AppButton>
      </div>
      {visibleDeviceForm && (
        <div className="col-span-12">
          <AddVictimForm />
        </div>
      )}
      <div className="col-span-12 mt-5">
        <AppVictimssTable onEdit={() => {}} />
      </div>
    </>
  );
};
