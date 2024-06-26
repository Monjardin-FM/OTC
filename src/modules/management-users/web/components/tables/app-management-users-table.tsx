import React from 'react';
import { UserManage } from 'modules/management-users/domain/entities/userManage';
import { AppAvatar } from 'presentation/components/AppAvatar';
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from 'presentation/components/AppDataGrid';
import { UIColorScheme } from 'presentation/types/ui-color-schema';
import * as Icon from 'react-feather';
import { AppBadge } from 'presentation/components/AppBadge';
import { AppButton } from 'presentation/components/AppButton';
import { AppTooltip } from 'presentation/components/AppTooltip';
export type ManagementUsersTableProps = {
  items?: UserManage[];
  onEdit: (params: RenderFnParams<UserManage>) => void;
  onDelete: (params: RenderFnParams<UserManage>) => void;
};
const getRandomColorSchema = (params: { length: number }) => {
  const colors: UIColorScheme[] = [
    'gray',
    'primary',
    'success',
    'info',
    'warn',
    'danger',
  ];
  return colors[params.length % colors.length] || 'gray';
};

const NamUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.name.length,
          })}
        >
          <Icon.User size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">{params.record.name}</div>
      </div>
    </div>
  );
};

const RoleUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <AppBadge>
      <div className="font-semibold text-sm text-primary-600 tracking-wider">
        {params.record.role}
      </div>
    </AppBadge>
  );
};

const EmailUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <AppBadge colorScheme="primary">
      <div className="font-medium text-sm">{params.record.eMail}</div>
    </AppBadge>
  );
};

const ActionsColumn = ({
  onEdit,
  record,
  onDelete,
}: RenderFnParams<UserManage> & {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Edit User"
          size="sm"
          variant="ghost"
        >
          <Icon.Eye size={18} />
        </AppButton>
        <AppTooltip>Edit User</AppTooltip>
      </div>
      <div className="group relative inline-block text-center">
        <AppButton
          size="sm"
          variant="ghost"
          colorScheme="danger"
          onClick={() => {
            onDelete();
          }}
        >
          <Icon.XOctagon size={18} />
        </AppButton>
        <AppTooltip>Delete User</AppTooltip>
      </div>
    </div>
  );
};

export const AppManagementUsersTable = ({
  items = [],
  onEdit,
  onDelete,
}: ManagementUsersTableProps) => {
  const columns: AppDataGridColumn<UserManage>[] = [
    {
      key: 'userName',
      dataIndex: 'userName',
      title: 'Name User',
      render: NamUserColumn,
    },
    {
      key: 'roleUser',
      dataIndex: 'roleUser',
      title: 'Role',
      render: RoleUserColumn,
    },
    {
      key: 'emailUser',
      dataIndex: 'emailUser',
      title: 'Email',
      render: EmailUserColumn,
    },
    {
      key: 'actionsClient',
      dataIndex: 'actionsClient',
      title: 'Actions',
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
        }),
    },
  ];
  return (
    <AppDataGrid<UserManage>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
