import React from 'react';
import { TrackingDetail } from 'modules/tracking/domain/entities/tracking-detail';
import { AppAvatar } from 'presentation/components/AppAvatar';
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from 'presentation/components/AppDataGrid';
import * as Icon from 'react-feather';
import { AppButton } from 'presentation/components/AppButton';
import { AppTooltip } from 'presentation/components/AppTooltip';
import { AppBadge } from 'presentation/components/AppBadge';
export type TrackingDetailsTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: TrackingDetail[];
  onEdit: (params: RenderFnParams<TrackingDetail>) => void;
  // onNotification: (params: RenderFnParams<UserManage>) => void;
  // onUpdateAlmacen: (params: RenderFnParams<UserManage>) => void;
};

const NameTrackingDetailColumn = (params: RenderFnParams<TrackingDetail>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar colorSchema={'warn'}>
          <Icon.AlertCircle size={20} />
        </AppAvatar>
      </div>
      <div className="font-semibold text-sm text-primary-700 TrackingDetail-wider">
        {params.record.alarmType}
      </div>
    </div>
  );
};
const SIDTrackingDetailColumn = (params: RenderFnParams<TrackingDetail>) => {
  return (
    <div className="flex items-center space-x-3">
      <AppBadge colorScheme="info">
        <div className="font-semibold text-sm text-primary-600 TrackingDetail-wider">
          {params.record.Date}
        </div>
      </AppBadge>
    </div>
  );
};
const BatteryTrackingDetailColumn = (
  params: RenderFnParams<TrackingDetail>,
) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="font-semibold TrackingDetail-wider">
        {params.record.startus ? (
          <div className="bg-success-300 rounded-lg p-2 text-success-600 group relative inline-block text-center">
            <Icon.Circle size={18} />
            <AppTooltip>Active</AppTooltip>
          </div>
        ) : (
          <div className="bg-danger-300 rounded-lg p-2 text-danger-600">
            <Icon.AlertTriangle size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

const ActionsColumn = ({
  onEdit,
  record,
}: RenderFnParams<TrackingDetail> & {
  onEdit: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Edit TrackingDetail"
          size="sm"
          variant="ghost"
          colorScheme="danger"
        >
          <Icon.XCircle size={18} />
        </AppButton>
        <AppTooltip>Cancel Alarm</AppTooltip>
      </div>
    </div>
  );
};

export const AppTrackingDetailsTable = ({
  items = [],
  onEdit,
}: TrackingDetailsTableProps) => {
  const columns: AppDataGridColumn<TrackingDetail>[] = [
    {
      key: 'TrackingDetailName',
      dataIndex: 'TrackingDetailName',
      title: 'Type Alarm',
      render: NameTrackingDetailColumn,
    },
    {
      key: 'TrackingDetailSID',
      dataIndex: 'TrackingDetailSID',
      title: 'Date',
      render: SIDTrackingDetailColumn,
    },
    {
      key: 'TrackingDetailBattery',
      dataIndex: 'TrackingDetailBattery',
      title: 'Status',
      render: BatteryTrackingDetailColumn,
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
    <AppDataGrid<TrackingDetail>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
