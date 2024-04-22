import React, { useEffect, useState } from 'react';
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
import { useGetDevices } from '../hooks/use-get-devices';
import { AppEditDeviceModal } from './modals/app-edit-device';
import { useDeleteDevice } from '../hooks/use-delete-device';
import { AppLoading } from 'presentation/components/AppLoading';

export const AppDevicesManagerPage = () => {
  const [visibleNewDeviceModal, setVisibleNewDeviceModal] = useToggle(false);
  const [visibleEditDeviceModal, setVisibleEditDeviceModal] = useToggle(false);
  const [idDevice, setIdDevice] = useState<number>();
  const { devices, getDevices, loading: loadingDevices } = useGetDevices();
  const [toggleReload, setToggleReload] = useToggle(false);
  const { deleteDevice } = useDeleteDevice();
  const onClick = (search: string) => {
    getDevices({ completeName: search });
  };
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onClick(search);
      }, 500);
      return () => clearTimeout(timeDelay);
    }
  }, [search, toggleReload]);
  useEffect(() => {
    getDevices({ completeName: '' });
  }, [toggleReload]);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      {!devices && <AppLoading />}
      <AppNewDeviceModal
        isVisible={visibleNewDeviceModal}
        onClose={() => setVisibleNewDeviceModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
      />
      <AppEditDeviceModal
        isVisible={visibleEditDeviceModal}
        onClose={() => setVisibleEditDeviceModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
        idDevice={idDevice}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppDevicesHeader
            onClick={onClick}
            loadingDevices={loadingDevices}
            search={search}
            setSearch={setSearch}
          />
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
          <AppDevicessTable
            onEdit={(record) => {
              setIdDevice(record.record.idDevice);
              setVisibleEditDeviceModal(true);
            }}
            onDelete={async (record) => {
              if (record.record.idDevice) {
                await deleteDevice({ idDevice: record.record.idDevice });
              }
              setToggleReload(!toggleReload);
            }}
            items={devices}
          />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
