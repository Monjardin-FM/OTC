import React, { useEffect, useState } from 'react';
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
import { useCreateAlarm } from '../../hooks/use-create-alarm';
import { Formik } from 'formik';
import { useGetResponsiveDevices } from 'modules/catalog/hooks/use-get-responsive-devices';
import { useGetDeviceType } from 'modules/catalog/hooks/use-get-device-type';
import { ResponseDevice } from 'modules/catalog/domain/entities/response-device';
import { DeviceType } from 'modules/catalog/domain/entities/device-type';
import { AppToggleButton } from 'presentation/components/AppToggleButton';

export type AppNewAlarmModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
};
type AlarmCreateFormValues = {
  name: string;
  interval: number;
  geocordinateTimeout: number;
  restrainingDistance: number;
  cancellationTime: number;
  textSMS: string;
  textMail: string;
  callResponse: string;
};
export const AppNewAlarmModal = ({
  isVisible,
  onClose,
  onReload,
}: AppNewAlarmModalProps) => {
  const { createAlarm } = useCreateAlarm();
  const { responsiveDevices, getResponsiveDevices } = useGetResponsiveDevices();
  const { deviceType, getDeviceType } = useGetDeviceType();
  const [selectedResponseDevicesValues, setSelectedResponseDevices] = useState<
    ResponseDevice[]
  >([]);
  const [selectedDeviceTypeValues, setSelectedDeviceType] = useState<
    DeviceType[]
  >([]);
  const [status, setStatus] = useState(false);

  const onSubmitHandler = async (data: AlarmCreateFormValues) => {
    console.log(data);
    await createAlarm({
      automatic: status,
      callText: data.callResponse,
      enableResponseCall: data.callResponse.length > 0,
      description: data.name,
      dynamicDistance: data.restrainingDistance,
      geocordinateTimeout: data.geocordinateTimeout,
      responseInterval: data.interval,
      resolveTime: data.cancellationTime,
      idStatus: 1,
      lAssignedDevice: selectedDeviceTypeValues,
      lResponseDevice: selectedResponseDevicesValues,
      mailText: data.textMail,
      smsText: data.textSMS,
    });
    onReload();
  };
  const onSelectResponseDevices = (selectedList: [], selectedItems: []) => {
    setSelectedResponseDevices(selectedList);
  };
  const onSelectDeviceType = (selectedList: [], selectedItems: []) => {
    setSelectedDeviceType(selectedList);
  };
  useEffect(() => {
    getResponsiveDevices();
    getDeviceType();
  }, []);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="7xl">
      <AppModalOverlay>
        <AppModalContent>
          <Formik
            enableReinitialize
            initialValues={{
              name: '',
              automatic: false,
              interval: 0,
              geocordinateTimeout: 0,
              restrainingDistance: 0,
              cancellationTime: 0,
              textSMS: '',
              textMail: '',
              callResponse: '',
            }}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <AppModalHeader>New Alarm</AppModalHeader>
                <AppModalBody>
                  <div className="grid grid-cols-12 gap-y-4 gap-x-3">
                    <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-4">
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Name</AppFormLabel>
                        <AppTextField
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </AppFormField>

                      <AppFormField className="col-span-6">
                        <AppFormLabel>Automatic</AppFormLabel>
                        <div className="flex flex-row items-center justify-start gap-5">
                          <span>Inactive</span>
                          {status ? (
                            <AppToggleButton
                              name="automatic"
                              // value={status}
                              onChange={() => setStatus(!status)}
                              checked={status}
                            ></AppToggleButton>
                          ) : (
                            <AppToggleButton
                              name="automatic"
                              // value={values.status}
                              onChange={() => setStatus(!status)}
                              checked={status}
                            ></AppToggleButton>
                          )}

                          <span>Active</span>
                        </div>
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Response Devices</AppFormLabel>
                        <Multiselect
                          displayValue="responseDevice"
                          showCheckbox={true}
                          options={responsiveDevices}
                          onSelect={onSelectResponseDevices}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Assigned Devices</AppFormLabel>
                        <Multiselect
                          displayValue="deviceType"
                          showCheckbox={true}
                          options={deviceType}
                          onSelect={onSelectDeviceType}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Interval</AppFormLabel>
                        <AppTextField
                          name="interval"
                          value={values.interval}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Geocordinate Timeout</AppFormLabel>
                        <AppTextField
                          name="geocordinateTimeout"
                          value={values.geocordinateTimeout}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Restraining Distance</AppFormLabel>
                        <AppTextField
                          name="restrainingDistance"
                          value={values.restrainingDistance}
                          onChange={handleChange}
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Automatic Cancellation Time</AppFormLabel>
                        <AppTextField
                          name="cancellationTime"
                          value={values.cancellationTime}
                          onChange={handleChange}
                        />
                      </AppFormField>
                    </div>
                    <div className="grid grid-cols-12 col-span-6 gap-x-3 gap-y-5">
                      <AppFormField className="col-span-6 ">
                        <AppFormLabel>Text SMS</AppFormLabel>
                        <textarea
                          name="textSMS"
                          value={values.textSMS}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Text Mail</AppFormLabel>
                        <textarea
                          name="textMail"
                          value={values.textMail}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                      <AppFormField className="col-span-6 ">
                        <AppFormLabel>Call</AppFormLabel>
                        <textarea
                          name="callResponse"
                          value={values.callResponse}
                          onChange={handleChange}
                          className="w-full h-40 border border-gray-300 rounded-lg p-5"
                        ></textarea>
                      </AppFormField>
                    </div>
                  </div>
                </AppModalBody>
                <AppModalFooter>
                  <AppButton onClick={onClose}>Cancel</AppButton>
                  <AppButton colorScheme="primary" type="submit">
                    Save
                  </AppButton>
                </AppModalFooter>
              </form>
            )}
          </Formik>
        </AppModalContent>
      </AppModalOverlay>
    </AppModal>
  );
};
