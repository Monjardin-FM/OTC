import React, { useEffect } from 'react';
import { AppAuthorizationGuard } from 'presentation/components/AppAuthorizationGuard';
import AppConfig from 'settings.json';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { AppPageTransition } from 'presentation/components/AppPageTransition';
import { AppManagemenetUsersHeader } from './app-management-users-header';
import { AppManagementUsersTable } from './tables/app-management-users-table';
// import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { AppButton } from 'presentation/components/AppButton';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { useToggle } from 'react-use';
import { AppNewUserModal } from './modals/app-new-user-modal';
import { useGetUsers } from '../hooks/use-get-users';
export const ManagementUsersManagerPage = () => {
  const [visibleNewUserModal, setVisibleNewUserModal] = useToggle(false);
  const { users, getUsers } = useGetUsers();
  useEffect(() => {
    getUsers({ completeName: '' });
  }, []);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig['userManagement.managerPage.authorization'] as UserRole[]
      }
      redirect={{ to: '/' }}
    >
      <AppNewUserModal
        isVisible={visibleNewUserModal}
        onClose={() => setVisibleNewUserModal(false)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppManagemenetUsersHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewUserModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New User</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppManagementUsersTable onEdit={() => {}} items={users} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
