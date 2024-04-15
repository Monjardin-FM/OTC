import React from 'react';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import AppConfig from 'settings.json';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import { AppDevicesHeader } from './app-devices-header';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { useToggle } from 'react-use';
import { AppNewDeviceModal } from './modals/app-new-device-modal';
import { AppDevicessTable } from './tables/app-device-table';

export const AppDevicesManagerPage = () => {
  const [visibleNewDeviceModal, setVisibleNewDeviceModal] = useToggle(false);

  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppNewDeviceModal
        isVisible={visibleNewDeviceModal}
        onClose={() => setVisibleNewDeviceModal(false)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppDevicesHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewDeviceModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New Device</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppDevicessTable onEdit={() => {}} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
