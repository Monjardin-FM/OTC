import React from 'react';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import AppConfig from 'settings.json';
import { AppTrackingHeader } from './app-tracking-header';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppTrackingsTable } from './tables/app-tracking-table';
import { Tracking } from 'modules/tracking/domain/entities/tracking';
import { AppTrackingModal } from './modals/app-tracking-modal';
import { useToggle } from 'react-use';

export const AppTrackingManagerPage = () => {
  const [visibleTrackingModal, setVisibleTrackingModal] = useToggle(false);
  const items: Tracking[] = [
    {
      idTracking: 1,
      SID: 12345,
      name: 'Jhon Wats',
      perimeter: true,
      Battery: false,
      position: true,
      tampering: true,
    },
  ];
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppTrackingModal
        isVisible={visibleTrackingModal}
        onClose={() => setVisibleTrackingModal(false)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppTrackingHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center"></div>
        <div className="container mx-auto mt-5">
          <AppTrackingsTable
            onEdit={() => {
              setVisibleTrackingModal(true);
            }}
            items={items}
          />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
