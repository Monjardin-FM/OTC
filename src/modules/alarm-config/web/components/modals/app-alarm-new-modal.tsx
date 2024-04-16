import React, { useState } from 'react';
import { AppButton } from 'presentation/components/AppButton';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import {
  AppModal,
  AppModalBody,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';
// import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import { Multiselect } from 'multiselect-react-dropdown';

export type AppNewAlarmModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppNewAlarmModal = ({
  isVisible,
  onClose,
}: AppNewAlarmModalProps) => {
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
    <AppModal isVisible={isVisible} onClose={onClose} size="7xl">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>New Alarm</AppModalHeader>
          <AppModalBody>
            <form>
              <div className="grid grid-cols-12 gap-y-4 gap-x-3">
                <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-4">
                  <AppFormField className="col-span-12">
                    <AppFormLabel>Name</AppFormLabel>
                    <AppTextField />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Response Devices</AppFormLabel>
                    <Multiselect
                      displayValue="name"
                      showCheckbox={true}
                      options={selectedValues}
                      onSelect={onSelect}
                    />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Assigned Devices</AppFormLabel>
                    <Multiselect
                      displayValue="name"
                      showCheckbox={true}
                      options={selectedValues}
                      onSelect={onSelect}
                    />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Interval</AppFormLabel>
                    <AppTextField />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Geocordinate Timeout</AppFormLabel>
                    <AppTextField />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Restraining Distance</AppFormLabel>
                    <AppTextField />
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Automatic Cancellation Time</AppFormLabel>
                    <AppTextField />
                  </AppFormField>
                </div>
                <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-5">
                  <AppFormField className="col-span-6 ">
                    <AppFormLabel>Text SMS</AppFormLabel>
                    <textarea className="w-full h-40 border border-gray-300 rounded-lg p-5"></textarea>
                  </AppFormField>
                  <AppFormField className="col-span-6">
                    <AppFormLabel>Text Mail</AppFormLabel>
                    <textarea className="w-full h-40 border border-gray-300 rounded-lg p-5"></textarea>
                  </AppFormField>
                  <AppFormField className="col-span-6 ">
                    <AppFormLabel>Call</AppFormLabel>
                    <textarea className="w-full h-40 border border-gray-300 rounded-lg p-5"></textarea>
                  </AppFormField>
                </div>
              </div>
            </form>
          </AppModalBody>
          <AppModalFooter>
            <AppButton onClick={onClose}>Cancel</AppButton>
            <AppButton colorScheme="primary">Save</AppButton>
          </AppModalFooter>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
