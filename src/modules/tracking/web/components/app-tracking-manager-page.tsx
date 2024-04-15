import React from 'react';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import AppConfig from 'settings.json';
import { AppTrackingHeader } from './app-tracking-header';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppTrackingsTable } from './tables/app-tracking-table';

export const AppTrackingManagerPage = () => {
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppTrackingHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center"></div>
        <div className="container mx-auto mt-5">
          <AppTrackingsTable onEdit={() => {}} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
