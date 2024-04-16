import React from 'react';
import {
  AppModal,
  AppModalBody,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
// import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import AppSelect from 'presentation/components/AppSelect';
export type AppNewDeviceModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppNewDeviceModal = ({
  isVisible,
  onClose,
}: AppNewDeviceModalProps) => {
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="3xl">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>New Device</AppModalHeader>
          <AppModalBody>
            <div className="grid grid-cols-12 gap-y-4 gap-x-3">
              <AppFormField className="col-span-6">
                <AppFormLabel>Device Type</AppFormLabel>
                <AppSelect>
                  <option>Select device</option>
                </AppSelect>
              </AppFormField>
              <AppFormField className="col-span-6">
                <AppFormLabel>Phone Number / IMEI</AppFormLabel>
                <AppTextField />
              </AppFormField>

              <AppFormField className="col-span-6">
                <AppFormLabel>Status</AppFormLabel>
                <div className="flex flex-row items-center justify-start gap-3">
                  <span>Inactive</span>
                  <AppToggleButton></AppToggleButton>
                  <span>Active</span>
                </div>
              </AppFormField>
            </div>
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
