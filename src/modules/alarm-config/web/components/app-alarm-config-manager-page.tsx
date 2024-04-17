import React, { useEffect } from 'react';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import AppConfig from 'settings.json';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { useToggle } from 'react-use';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { AppAlarmsHeader } from './app-alarms-header';
import { AppNewAlarmModal } from './modals/app-alarm-new-modal';
import { AppAlarmssTable } from './tables/app-alarm-table';
import { useGetAlarms } from '../hooks/use-get-alarms';
export const AppAlarmConfigManagerPage = () => {
  const [visibleNewAlarmModal, setVisibleNewAlarmModal] = useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const { alarms, getAlarms } = useGetAlarms();
  useEffect(() => {
    getAlarms();
  }, [toggleReload]);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppNewAlarmModal
        isVisible={visibleNewAlarmModal}
        onClose={() => setVisibleNewAlarmModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppAlarmsHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewAlarmModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New Alarm</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppAlarmssTable onEdit={() => {}} items={alarms} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
