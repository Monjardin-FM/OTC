import React from 'react';
import * as Icon from 'react-feather';
import { Alarm } from 'modules/alarm-config/domain/entities/alarms';
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from 'presentation/components/AppDataGrid';
import { UIColorScheme } from 'presentation/types/ui-color-schema';
import { AppAvatar } from 'presentation/components/AppAvatar';
import { AppBadge } from 'presentation/components/AppBadge';
import { AppButton } from 'presentation/components/AppButton';
import { AppTooltip } from 'presentation/components/AppTooltip';
export type AlarmsTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: Alarm[];
  onEdit: (params: RenderFnParams<Alarm>) => void;
  // onNotification: (params: RenderFnParams<UserManage>) => void;
  // onUpdateAlmacen: (params: RenderFnParams<UserManage>) => void;
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

const NameAlarmsColumn = (params: RenderFnParams<Alarm>) => {
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

const StatusAlarmsColumn = (params: RenderFnParams<Alarm>) => {
  return (
    <AppBadge colorScheme="primary">
      <div className="font-medium text-sm">{params.record.status}</div>
    </AppBadge>
  );
};

const ActionsColumn = ({
  onEdit,
  record,
}: RenderFnParams<Alarm> & {
  onEdit: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Edit Alarm"
          size="sm"
          variant="ghost"
        >
          <Icon.Eye size={18} />
        </AppButton>
        <AppTooltip>Edit Alarm</AppTooltip>
      </div>
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Delete Alarm"
          size="sm"
          variant="ghost"
        >
          <Icon.Eye size={18} />
        </AppButton>
        <AppTooltip>Delete Alarm</AppTooltip>
      </div>
    </div>
  );
};

export const AppAlarmssTable = ({ items = [], onEdit }: AlarmsTableProps) => {
  const columns: AppDataGridColumn<Alarm>[] = [
    {
      key: 'AlarmsName',
      dataIndex: 'AlarmsName',
      title: 'Name',
      render: NameAlarmsColumn,
    },
    {
      key: 'AlarmsStatus',
      dataIndex: 'AlarmsStatus',
      title: 'Status',
      render: StatusAlarmsColumn,
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
        }),
    },
  ];
  return (
    <AppDataGrid<Alarm> columns={columns} dataSource={items} itemKey="id" />
  );
};
