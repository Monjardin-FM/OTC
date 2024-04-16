import React, { useState } from 'react';
import { AppButton } from 'presentation/components/AppButton';
import {
  AppModal,
  AppModalBody,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';

import {
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
} from 'presentation/components/AppTabs';
import { DefendantForm } from '../forms/defendant-form';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import { VictimForm } from '../forms/victim-form';
import { AlarmForm } from '../forms/alarm-form';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import { ReferenceForm } from '../forms/reference-from';
import { AppBadge } from 'presentation/components/AppBadge';

export type AppNewDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppNewDefendantModal = ({
  isVisible,
  onClose,
}: AppNewDefendantModalProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="full">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>
            <div className="flex flex-row items-center justify-evenly gap-5 ">
              <span>New Defendant</span>
              <span>
                <AppBadge colorScheme="warn">Defendant Name:</AppBadge>
              </span>
              <span>
                <AppBadge colorScheme="warn">SID:</AppBadge>
              </span>
            </div>
          </AppModalHeader>
          <AppModalBody>
            <div className="w-full grid grid-cols-3 items-center justify-center mb-3 gap-4">
              <AppFormField className="col-span-1">
                <AppFormLabel>Officer</AppFormLabel>
                <AppTextField />
              </AppFormField>
              <AppFormField className="col-span-1">
                <AppFormLabel>Status</AppFormLabel>
                <div className="flex flex-row items-center justify-start gap-3">
                  <span>Inactive</span>
                  <AppToggleButton></AppToggleButton>
                  <span>Active</span>
                </div>
              </AppFormField>
            </div>
            <AppTabs
              index={selectedTab}
              onChange={(index) => setSelectedTab(index)}
            >
              <AppTabList>
                <AppTab>Defendant</AppTab>
                <AppTab>Victims</AppTab>
                <AppTab>Alarms</AppTab>
                <AppTab>Reference Contacts</AppTab>
              </AppTabList>
              <AppTabPanels>
                <AppTabPanel>
                  <DefendantForm />
                </AppTabPanel>
                <AppTabPanel>
                  <VictimForm />
                </AppTabPanel>
                <AppTabPanel>
                  <AlarmForm />
                </AppTabPanel>
                <AppTabPanel>
                  <ReferenceForm />
                </AppTabPanel>
              </AppTabPanels>
            </AppTabs>
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
