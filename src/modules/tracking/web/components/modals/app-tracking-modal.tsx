import React from 'react';
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
import AppDatePicker from 'presentation/components/AppDatePicker';
import { AppFormField } from 'presentation/components/AppForm';
import { AppTrackingDetailsTable } from '../tables/app-tracking-detail-table';
import { TrackingDetail } from 'modules/tracking/domain/entities/tracking-detail';
export type AppTrackingModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppTrackingModal = ({
  isVisible,
  onClose,
}: AppTrackingModalProps) => {
  const items: TrackingDetail[] = [
    {
      alarmType: 'Battery',
      Date: '12/04/2024',
      startus: 'Active',
    },
    {
      alarmType: 'Position Timeout',
      Date: '8/04/2024',
      startus: 'Active',
    },
  ];
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="full">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader className="w-full">
            Tracking Info
            <div className="w-full flex flex-row items-center justify-center absolute top-4">
              <AppBadge colorScheme="warn">
                Defendant Name: <b>Jhon Wats</b>{' '}
              </AppBadge>
              <AppBadge colorScheme="warn">
                Phone: <b>202-555-0160</b>
              </AppBadge>
              <AppBadge colorScheme="warn">
                Officer:
                <b>Christian</b>
              </AppBadge>
            </div>
            <AppModalCloseButton />
          </AppModalHeader>
          <AppModalBody>
            <div className="w-full flex flex-col items-center justify-center gap-5">
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
              <div className="flex flex-col items-start justify-start gap-3 border">
                <span className="font-bold ml-3 text-primary-700">
                  Historic Position
                </span>
                <div className="grid grid-cols-12 px-10 w-full  gap-3">
                  <AppFormField className="col-span-2">
                    <AppDatePicker
                      onChange={() => {}}
                      className="col-span-4"
                      placeholderText="From"
                    />
                  </AppFormField>
                  <AppFormField className="col-span-2">
                    <AppDatePicker
                      onChange={() => {}}
                      className="col-span-4"
                      placeholderText="To"
                    />
                  </AppFormField>
                </div>
              </div>
              <div className="w-full">
                <AppTrackingDetailsTable onEdit={() => {}} items={items} />
              </div>
            </div>
          </AppModalBody>
          <AppModalFooter></AppModalFooter>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
