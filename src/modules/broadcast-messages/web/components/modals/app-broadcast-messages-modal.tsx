import React from 'react';
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

export type AppNewBroadcastMessagesModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppNewBroadcastMessagesModal = ({
  isVisible,
  onClose,
}: AppNewBroadcastMessagesModalProps) => {
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="lg">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>New BroadcastMessages</AppModalHeader>
          <AppModalBody>
            <div className="grid grid-cols-12 gap-y-4 gap-x-3">
              <span className="col-span-12">
                Type your message. All defendants will be notified.
              </span>
              <AppFormField className="col-span-12">
                <AppFormLabel>Message</AppFormLabel>
                <textarea className="border border-gray-400 w-full h-32" />
              </AppFormField>
            </div>
          </AppModalBody>
          <AppModalFooter>
            <AppButton onClick={onClose}>Cancel</AppButton>
            <AppButton colorScheme="primary">Send Message</AppButton>
          </AppModalFooter>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
