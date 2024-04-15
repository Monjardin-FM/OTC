import React from 'react';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import AppConfig from 'settings.json';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { AppBroadcastMessagesHeader } from './app-broadcast-messages-header';
import { AppNewBroadcastMessagesModal } from './modals/app-broadcast-messages-modal';
import { useToggle } from 'react-use';
import { AppBroadcastMessagessTable } from './tables/app-broadcast-message-table';
export const AppBroadcastMessagesManagerPage = () => {
  const [visibleNewBroadcastMessageModal, setVisibleNewBroadcastMessageModal] =
    useToggle(false);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppNewBroadcastMessagesModal
        isVisible={visibleNewBroadcastMessageModal}
        onClose={() => {
          setVisibleNewBroadcastMessageModal(false);
        }}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppBroadcastMessagesHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewBroadcastMessageModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New Broadcast Message</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppBroadcastMessagessTable />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
