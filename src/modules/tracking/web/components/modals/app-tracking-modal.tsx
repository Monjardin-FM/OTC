import { AppBadge } from 'presentation/components/AppBadge';
import {
  AppModal,
  AppModalBody,
  AppModalCloseButton,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';
import React from 'react';
export type AppTrackingModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppTrackingModal = ({
  isVisible,
  onClose,
}: AppTrackingModalProps) => {
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="full">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>
            Tracking Info
            <AppModalCloseButton />
          </AppModalHeader>
          <AppModalBody>
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <div className="w-full flex flex-row items-center justify-around">
                <AppBadge>Defendant Name:</AppBadge>
                <AppBadge>Phone:</AppBadge>
                <AppBadge>Officer:</AppBadge>
              </div>
              <div className="w-full flex flex-col items-center justify-center p-5 rounded-lg bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d187018.1427050245!2d-98.5066351750962!3d29.427286642312595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1713305015458!5m2!1ses-419!2smx"
                  width="100%"
                  height="500"
                  //   style="border:0;"
                  //   allowfullscreen=""
                  loading="lazy"
                  //   referrerpolicy="no-referrer-when-downgrade"
                  title="Map Tracking"
                ></iframe>
              </div>
            </div>
          </AppModalBody>
          <AppModalFooter></AppModalFooter>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
