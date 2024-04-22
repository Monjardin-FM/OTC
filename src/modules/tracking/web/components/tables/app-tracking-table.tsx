import React from 'react';
import * as Icon from 'react-feather';
import { Tracking } from 'modules/tracking/domain/entities/tracking';
import { AppAvatar } from 'presentation/components/AppAvatar';
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from 'presentation/components/AppDataGrid';
import { UIColorScheme } from 'presentation/types/ui-color-schema';
import { AppButton } from 'presentation/components/AppButton';
import { AppTooltip } from 'presentation/components/AppTooltip';
export type TrackingsTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: Tracking[];
  onEdit: (params: RenderFnParams<Tracking>) => void;
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
const NameTrackingColumn = (params: RenderFnParams<Tracking>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.name.length,
          })}
        >
          <Icon.MapPin size={20} />
        </AppAvatar>
      </div>
      <div className="font-semibold text-sm text-primary-700 tracking-wider">
        {`${params.record.name} ${params.record.lastName}`}
      </div>
    </div>
  );
};
// const SIDTrackingColumn = (params: RenderFnParams<Tracking>) => {
//   return (
//     <div className="flex items-center space-x-3">
//       <AppBadge colorScheme="info">
//         <div className="font-semibold text-sm text-primary-600 tracking-wider">
//           {params.record.name}
//         </div>
//       </AppBadge>
//     </div>
//   );
// };
const BatteryTrackingColumn = (params: RenderFnParams<Tracking>) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="font-semibold tracking-wider">
        {params.record.name ? (
          <div className="bg-success-300 rounded-lg p-2 text-success-600">
            <Icon.Circle size={18} />
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
const PositionTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const positionTimeout = params.record.alerts.find(
    (alert) => alert.alarmName === 'Position Timeout',
  );
  return (
    <div className="flex items-center space-x-3">
      <div className="font-semibold tracking-wider">
        {positionTimeout && positionTimeout.seqMachineState ? (
          <div className="bg-success-300 rounded-lg p-2 text-success-600">
            <Icon.Circle size={18} />
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

const PerimeterTrackingColumn = (params: RenderFnParams<Tracking>) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="font-semibold tracking-wider">
        {params.record.name ? (
          <div className="bg-success-300 rounded-lg p-2 text-success-600">
            <Icon.Circle size={18} />
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
const TamperingTrackingColumn = (params: RenderFnParams<Tracking>) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="font-semibold tracking-wider">
        {params.record.name ? (
          <div className="bg-success-300 rounded-lg p-2 text-success-600">
            <Icon.Circle size={18} />
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
}: RenderFnParams<Tracking> & {
  onEdit: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Edit Tracking"
          size="sm"
          variant="ghost"
        >
          <Icon.Map size={18} />
        </AppButton>
        <AppTooltip>Tracking</AppTooltip>
      </div>
    </div>
  );
};

export const AppTrackingsTable = ({
  items = [],
  onEdit,
}: TrackingsTableProps) => {
  const columns: AppDataGridColumn<Tracking>[] = [
    {
      key: 'TrackingName',
      dataIndex: 'TrackingName',
      title: 'Name',
      render: NameTrackingColumn,
    },
    // {
    //   key: 'TrackingSID',
    //   dataIndex: 'TrackingSID',
    //   title: 'SID',
    //   render: SIDTrackingColumn,
    // },
    {
      key: 'TrackingBattery',
      dataIndex: 'TrackingBattery',
      title: 'Battery',
      render: BatteryTrackingColumn,
    },
    {
      key: 'TrackingPosition',
      dataIndex: 'TrackingPosition',
      title: 'Position',
      render: PositionTrackingColumn,
    },
    {
      key: 'TrackingPerimeter',
      dataIndex: 'TrackingPerimeter',
      title: 'Perimeter',
      render: PerimeterTrackingColumn,
    },
    {
      key: 'TrackingTampering',
      dataIndex: 'TrackingTampering',
      title: 'Tampering',
      render: TamperingTrackingColumn,
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
    <AppDataGrid<Tracking> columns={columns} dataSource={items} itemKey="id" />
  );
};
