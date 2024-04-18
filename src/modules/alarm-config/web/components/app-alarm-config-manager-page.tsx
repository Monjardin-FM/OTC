import React, { useEffect, useState } from 'react';
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
import { AppEditAlarmModal } from './modals/app-alarm-edit-modal';
import { useDeleteAlarm } from '../hooks/use-delete-alarm';

export const AppAlarmConfigManagerPage = () => {
  const [visibleNewAlarmModal, setVisibleNewAlarmModal] = useToggle(false);
  const [visibleEditAlarmModal, setVisibleEditAlarmModal] = useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const { alarms, getAlarms } = useGetAlarms();
  const { deleteAlarm } = useDeleteAlarm();
  const [idAlarm, setIdAlarm] = useState<number | null>();

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
      <AppEditAlarmModal
        isVisible={visibleEditAlarmModal}
        onClose={() => setVisibleEditAlarmModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
        idAlarm={idAlarm}
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
          <AppAlarmssTable
            onEdit={({ record }) => {
              setIdAlarm(record.idAlarmType);
              setVisibleEditAlarmModal(true);
            }}
            onDelete={async (record) => {
              if (record.record.idAlarmType) {
                await deleteAlarm({ idAlarmType: record.record.idAlarmType });
              }
              setToggleReload(!toggleReload);
            }}
            items={alarms}
          />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
