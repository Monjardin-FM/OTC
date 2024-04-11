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
    <AppModal isVisible={isVisible} onClose={onClose} size="6xl">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>New Defendant</AppModalHeader>
          <AppModalBody>
            <div className="w-full grid grid-cols-3 items-center justify-center mb-3">
              <AppFormField>
                <AppFormLabel>Officer</AppFormLabel>
                <AppTextField />
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
