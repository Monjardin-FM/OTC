import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
import * as Icon from 'react-feather';
import { useToggle } from 'react-use';
import AppTextField from 'presentation/components/AppTextField';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import { AppCheckbox } from 'presentation/components/AppCheckbox';
import AppDatePicker from 'presentation/components/AppDatePicker';
export type AddAlarmFormProps = {
  onClose: () => void;
};
export const AddAlarmForm = ({ onClose }: AddAlarmFormProps) => {
  const [visibleGeofenceForm, setVisibleGeofenceForm] = useToggle(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const [selectedValues, setSelectedValues] = useState([
    { name: 'Option 1', id: 1 },
    { name: 'Option 2', id: 2 },
    { name: 'Option 3', id: 3 },
    { name: 'Option 4', id: 4 },
  ]);
  console.log(setSelectedValues);
  const onSelect = (selectedList: [], selectedItems: []) => {
    console.log(selectedList);
    console.log(selectedItems);
  };
  return (
    <div className="col-span-12 grid grid-cols-12 gap-x-3 gap-y-4 bg-gray-200 rounded-lg p-5">
      <AppFormField className="col-span-4">
        <AppFormLabel>Response Devices</AppFormLabel>
        <Multiselect
          displayValue="name"
          showCheckbox={true}
          options={selectedValues}
          onSelect={onSelect}
        />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Assigned Devices</AppFormLabel>
        <Multiselect
          displayValue="name"
          showCheckbox={true}
          options={selectedValues}
          onSelect={onSelect}
        />
      </AppFormField>
      <AppFormField className="col-span-4">
        <AppFormLabel>Alarm Type</AppFormLabel>
        <AppSelect>
          <option>Select Alarm Type</option>
        </AppSelect>
      </AppFormField>
      <div className="col-span-12">
        <AppButton
          leftIcon={<Icon.PlusCircle size={18} />}
          colorScheme="primary"
          onClick={() => setVisibleGeofenceForm(!visibleGeofenceForm)}
        >
          New Geofence
        </AppButton>
        {visibleGeofenceForm && (
          <div className="col-span-12 grid grid-cols-12 gap-x-3 gap-y-4 bg-gray-200 rounded-lg p-5">
            <AppFormField className="col-span-4">
              <AppFormLabel>Name</AppFormLabel>
              <AppTextField />
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>Status</AppFormLabel>
              <div className="flex flex-row items-center justify-start gap-3">
                <span>Inactive</span>
                <AppToggleButton></AppToggleButton>
                <span>Active</span>
              </div>
            </AppFormField>
            <div className="w-full rounded-lg bg-gray-200 col-span-12">
              {/* <AppGeofence /> */}
            </div>
            <div className="col-span-4 flex flex-col items-start justify-start border bg-white p-5 gap-5 rounded-lg">
              <span className="col-span-12 text-center font-bold text-primary-700 mb-10">
                Exceptions
              </span>
              <AppFormField className="col-span-6">
                <AppFormLabel>Recurrent</AppFormLabel>
                <AppCheckbox></AppCheckbox>
              </AppFormField>
              <AppFormField>
                <AppFormLabel>Days</AppFormLabel>
                <AppDatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </AppFormField>
              <div className="flex flex-row gap-3">
                <AppFormField>
                  <AppFormLabel>Start Hour</AppFormLabel>
                  <AppDatePicker
                    onChange={() => {}}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </AppFormField>
                <AppFormField>
                  <AppFormLabel>End Hour</AppFormLabel>
                  <AppDatePicker
                    onChange={() => {}}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </AppFormField>
              </div>
              <div className="flex flex-row items-end justify-end w-full">
                <AppButton colorScheme="primary">Add Exception</AppButton>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton colorScheme="primary">Save</AppButton>
      </div>
    </div>
  );
};
