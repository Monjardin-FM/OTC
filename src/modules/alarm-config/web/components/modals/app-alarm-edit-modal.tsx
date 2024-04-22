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
import AppTextField from 'presentation/components/AppTextField';
import { Multiselect } from 'multiselect-react-dropdown';
import { Formik } from 'formik';
import { useGetResponsiveDevices } from 'modules/catalog/hooks/use-get-responsive-devices';
import { useGetDeviceType } from 'modules/catalog/hooks/use-get-device-type';
import { ResponseDevice } from 'modules/catalog/domain/entities/response-device';
import { DeviceType } from 'modules/catalog/domain/entities/device-type';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import { useGetAlarmById } from '../../hooks/use-get-alarm-by-id';
import { useUpdateAlarm } from '../../hooks/use-update-alarm';

export type AppEditAlarmModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  idAlarm?: number | null;
};
type AlarmEditFormValues = {
  name: string;
  interval: number;
  geocordinateTimeout: number;
  restrainingDistance: number;
  cancellationTime: number;
  textSMS: string;
  textMail: string;
  callResponse: string;
};
export const AppEditAlarmModal = ({
  isVisible,
  onClose,
  onReload,
  idAlarm,
}: AppEditAlarmModalProps) => {
  const { updateAlarm } = useUpdateAlarm();
  const { responsiveDevices, getResponsiveDevices } = useGetResponsiveDevices();
  const [selectedResponseDefault, setSelectedResponseDefault] =
    useState<ResponseDevice>();
  console.log(setSelectedResponseDefault);
  const { deviceType, getDeviceType } = useGetDeviceType();
  const { alarm, getAlarmById } = useGetAlarmById();
  const [selectedResponseDevicesValues, setSelectedResponseDevices] = useState<
    Omit<ResponseDevice, 'responseDevice'>[]
  >([]);
  const [selectedDeviceTypeValues, setSelectedDeviceType] = useState<
    Omit<DeviceType, 'deviceType'>[]
  >([]);
  const [status, setStatus] = useState(false);

  const onSubmitHandler = async (data: AlarmEditFormValues) => {
    await updateAlarm({
      idAlarmType: alarm?.idAlarmType ? alarm.idAlarmType : 0,
      automatic: status,
      callText: data.callResponse,
      enableResponseCall: data.callResponse.length > 0,
      description: data.name,
      dynamicDistance: Number(data.restrainingDistance),
      geocordinateTimeout: Number(data.geocordinateTimeout),
      responseInterval: Number(data.interval),
      resolveTime: Number(data.cancellationTime),
      idStatus: 1,
      lAssignedDevice: selectedDeviceTypeValues,
      lResponseDevice: selectedResponseDevicesValues,
      mailText: data.textMail,
      smsText: data.textSMS,
    });
    onReload();
    onClose();
  };
  const onSelectResponseDevices = (selectedList: [], selectedItems: []) => {
    setSelectedResponseDevices(selectedList);
  };
  const onSelectDeviceType = (selectedList: [], selectedItems: []) => {
    setSelectedDeviceType(selectedList);
  };
  // function hacerMatch(
  //   primerConjunto: Omit<ResponseDevice, 'responseDevice'>[],
  //   segundoConjunto: ResponseDevice[],
  // ): ResponseDevice[] {
  //   return primerConjunto.map((obj) => {
  //     const matchedObj = segundoConjunto.find(
  //       (item) => item.idResponseDevice === obj.idResponseDevice,
  //     );
  //     if (matchedObj) {
  //       return {
  //         idResponseDevice: obj.idResponseDevice,
  //         responseDevice: matchedObj.responseDevice,
  //       };
  //     } else {
  //       // Manejar el caso donde no se encuentre un objeto coincidente
  //       return {
  //         idResponseDevice: obj.idResponseDevice,
  //         responseDevice: 'Sin coincidencia',
  //       };
  //     }
  //   });
  // }
  useEffect(() => {
    if (idAlarm) getAlarmById({ idAlarmType: idAlarm });
    getResponsiveDevices();
    getDeviceType();
  }, [idAlarm]);
  useEffect(() => {
    if (alarm) {
      setSelectedResponseDevices(alarm.lResponseDevice);
      // const selected = hacerMatch(
      //   selectedResponseDevicesValues,
      //   responsiveDevices ? responsiveDevices : [],
      // );
      // console.log(selected);
      // if (selected) setSelectedResponseDefault(selected);
      setStatus(alarm?.automatic);
    }
  }, [idAlarm, alarm]);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="7xl">
      <AppModalOverlay>
        <AppModalContent>
          <Formik
            enableReinitialize
            initialValues={{
              name: alarm?.description ? alarm.description : '',
              automatic: status,
              interval: alarm?.responseInterval ? alarm.responseInterval : 0,
              geocordinateTimeout: alarm?.geocordinateTimeout
                ? alarm.geocordinateTimeout
                : 0,
              restrainingDistance: alarm?.dynamicDistance
                ? alarm.dynamicDistance
                : 0,
              cancellationTime: alarm?.resolveTime ? alarm.resolveTime : 0,
              textSMS: alarm?.smsText ? alarm.smsText : '',
              textMail: alarm?.mailText ? alarm.mailText : '',
              callResponse: alarm?.callText ? alarm.callText : '',
            }}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <AppModalHeader>Edit Alarm</AppModalHeader>
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
                          selectedValues={selectedResponseDefault}
                          displayValue="responseDevice"
                          showCheckbox={true}
                          options={responsiveDevices}
                          onSelect={onSelectResponseDevices}
                          avoidHighlightFirstOption
                        />
                      </AppFormField>
                      <AppFormField className="col-span-6">
                        <AppFormLabel>Assigned Devices</AppFormLabel>
                        <Multiselect
                          displayValue="deviceType"
                          showCheckbox={true}
                          options={deviceType}
                          onSelect={onSelectDeviceType}
                          avoidHighlightFirstOption
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
