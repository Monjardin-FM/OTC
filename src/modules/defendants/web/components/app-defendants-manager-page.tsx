import React from 'react';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import AppConfig from 'settings.json';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import { AppDefendantsHeader } from './app-defendants-header';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { useToggle } from 'react-use';
import { AppDefendantsTable } from './tables/app-defendants-table';
import { AppNewDefendantModal } from './modals/app-new-defendant-modal';
export const AppDefendantsManagerPage = () => {
  const [visibleNewDefendantModal, setVisibleNewDefendantModal] =
    useToggle(false);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppNewDefendantModal
        isVisible={visibleNewDefendantModal}
        onClose={() => setVisibleNewDefendantModal(false)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppDefendantsHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewDefendantModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New Defendant</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppDefendantsTable onEdit={() => {}} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
