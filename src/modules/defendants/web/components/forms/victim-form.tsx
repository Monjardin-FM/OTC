import React from 'react';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { useToggle } from 'react-use';
import { AppVictimssTable } from 'modules/victim/web/components/app-victim-table';
import { AddVictimForm } from './app-add-victim-form';
import { useAutoAnimate } from '@formkit/auto-animate/react';
export const VictimForm = () => {
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  const [parent] = useAutoAnimate();
  return (
    <div
      ref={parent}
      className="flex flex-col items-start justify-center gap-3"
    >
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
        <div className="w-full">
          <AddVictimForm onClose={() => setVisibleDeviceForm(false)} />
        </div>
      )}
      <div className="w-full mt-5">
        <AppVictimssTable onEdit={() => {}} />
      </div>
    </div>
  );
};
