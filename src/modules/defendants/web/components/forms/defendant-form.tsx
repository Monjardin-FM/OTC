import React, { useEffect, useState } from 'react';
import { AppButton } from 'presentation/components/AppButton';
import AppDatePicker from 'presentation/components/AppDatePicker';
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import * as Icon from 'react-feather';
import { useToggle } from 'react-use';
import { DeviceForm } from './app-device-form';
import { AppDevicessTable } from 'modules/devices/web/components/tables/app-device-table';
import { AddressForm } from './address-form';
import { PhoneForm } from './phone-form';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { createDefendantParams } from 'modules/defendants/domain/repositories/defendant-repository';
import Select from 'react-select';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import { useGetUsers } from 'modules/management-users/web/hooks/use-get-users';
import { useGetGenders } from 'modules/management-users/web/hooks/use-get-genders';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useGetCounties } from 'modules/management-users/web/hooks/use-get-county';
import dayjs from 'dayjs';
import { Disclosure } from '@headlessui/react';
export type DefendantFormProps = {
  onCreateDefendant: (params: createDefendantParams) => void;
  onClose: () => void;
  isCreatedDefendant: boolean;
  idDefendant?: number;
};

type createDefendantFormValue = {
  name: string;
  lastName: string;
  email: string;
  caseNumber: string;
  gender: number;
  county: number;
  sid: string;
  offense: string;
  password: string;
};

export const DefendantForm = ({
  onCreateDefendant,
  onClose,
  isCreatedDefendant,
  idDefendant,
}: DefendantFormProps) => {
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [visiblePhoneForm, setVisiblePhoneForm] = useToggle(false);
  const [parent] = useAutoAnimate();
  const { getUsers, users } = useGetUsers();
  const { genders, getGenders } = useGetGenders();
  const { counties, getCounties } = useGetCounties();
  const [chiefs, setChiefs] = useState<{ value: number; label: string }[]>();
  const [idOfficer, setIdOfficer] = useState<number>();
  const [statusOfficer, setStatusOfficer] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const validationSchemaDefendant = Yup.object().shape({
    name: Yup.string().required('Required name'),
    lastName: Yup.string().required('Required last name'),
    email: Yup.string().required('Required email'),
    gender: Yup.number()
      .moreThan(0, 'Select a gender')
      .required('Select a gender'),
    county: Yup.number()
      .moreThan(0, 'Select a county')
      .required('Select a County'),
    password: Yup.string().required('Required password'),
    caseNumber: Yup.string().required('Required case number'),
    sid: Yup.string().required('Required sid'),
    offense: Yup.string().required('Required offense'),
  });

  const onSubmitHandler = (data: createDefendantFormValue) => {
    onCreateDefendant({
      name: data.name,
      lastName: data.lastName,
      completeName: `${data.name} ${data.lastName}`,
      eMail: data.email,
      caseNumber: data.caseNumber,
      idCounty: Number(data.county),
      idGender: Number(data.gender),
      idOfficer: Number(idOfficer),
      idStatus: statusOfficer ? 1 : 0,
      offense: data.offense,
      password: data.password,
      sid: data.sid,
      birthDate: dayjs(birthDate).format('YYYY/MM/DD'),
    });
  };

  useEffect(() => {
    getUsers({ completeName: '' });
    getGenders();
    getCounties();
  }, []);
  useEffect(() => {
    if (users) {
      const chiefFilter = users.filter((item) => item.role === 'Chief Officer');
      setChiefs(
        chiefFilter.map((item) => ({
          value: item.idPerson,
          label: `${item.name} ${item.lastName}`,
        })),
      );
    }
  }, [users]);

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          email: '',
          gender: 0,
          county: 0,
          caseNumber: '',
          sid: '',
          offense: '',
          password: '',
        }}
        enableReinitialize
        validationSchema={validationSchemaDefendant}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div
              ref={parent}
              className="grid grid-cols-12 gap-4 border rounded-lg p-3 bg-primary-100"
            >
              <div className="col-span-12 grid grid-cols-3 items-center justify-center mb-3 gap-4">
                <AppFormField className="col-span-1">
                  <AppFormLabel>Officer</AppFormLabel>
                  <Select
                    options={chiefs}
                    isSearchable={true}
                    onChange={(e) => setIdOfficer(e?.value)}
                  />
                </AppFormField>
                <AppFormField className="col-span-1">
                  <AppFormLabel>Status</AppFormLabel>
                  <div className="flex flex-row items-center justify-start gap-3">
                    <span>Inactive</span>

                    {statusOfficer ? (
                      <AppToggleButton
                        name="status"
                        onChange={() => setStatusOfficer(!statusOfficer)}
                        checked={statusOfficer}
                      ></AppToggleButton>
                    ) : (
                      <AppToggleButton
                        name="status"
                        onChange={() => setStatusOfficer(!statusOfficer)}
                        checked={statusOfficer}
                      ></AppToggleButton>
                    )}
                    <span>Active</span>
                  </div>
                </AppFormField>
              </div>
              <div className="col-span-12 grid grid-cols-12 gap-3">
                <AppFormField className="col-span-4">
                  <AppFormLabel>Name</AppFormLabel>
                  <AppTextField
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.name}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-4">
                  <AppFormLabel>Last Name</AppFormLabel>
                  <AppTextField
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.lastName}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-4">
                  <AppFormLabel>Email</AppFormLabel>
                  <AppTextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.email}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>County</AppFormLabel>
                  <AppSelect
                    name="county"
                    value={values.county}
                    onChange={handleChange}
                  >
                    <option value="">Select County</option>
                    {counties?.map((county) => (
                      <option key={county.idCounty} value={county.idCounty}>
                        {county.county}
                      </option>
                    ))}
                  </AppSelect>
                  {errors.county && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.county}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>Case Number</AppFormLabel>
                  <AppTextField
                    name="caseNumber"
                    value={values.caseNumber}
                    onChange={handleChange}
                  />
                  {errors.caseNumber && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.caseNumber}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>Date of Birth</AppFormLabel>
                  <AppDatePicker
                    selected={birthDate}
                    leftIcon={<Icon.Calendar size={18} />}
                    onChange={(date) => {
                      if (date instanceof Date) setBirthDate(date);
                    }}
                  />
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>Gender</AppFormLabel>
                  <AppSelect
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    {genders?.map((gender) => (
                      <option key={gender.idGender} value={gender.idGender}>
                        {gender.gender}
                      </option>
                    ))}
                  </AppSelect>
                  {errors.gender && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.gender}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>SID</AppFormLabel>
                  <AppTextField
                    name="sid"
                    value={values.sid}
                    onChange={handleChange}
                  />
                  {errors.sid && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.sid}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>Offense</AppFormLabel>
                  <AppTextField
                    name="offense"
                    value={values.offense}
                    onChange={handleChange}
                  />
                  {errors.offense && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.offense}
                    </AppFormHelperText>
                  )}
                </AppFormField>
                <AppFormField className="col-span-2">
                  <AppFormLabel>Password</AppFormLabel>
                  <AppTextField
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                  />
                  {errors.password && (
                    <AppFormHelperText colorSchema="danger">
                      {errors.password}
                    </AppFormHelperText>
                  )}
                </AppFormField>
              </div>
              <div className="col-span-12 flex flex-row items-center justify-end gap-3 ">
                <AppButton onClick={onClose}>Cancel</AppButton>
                <AppButton colorScheme="primary" type="submit">
                  Create Defendant
                </AppButton>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {isCreatedDefendant && (
        <div className="col-span-12 flex flex-row items-center justify-start gap-3 mt-5">
          <AppButton
            colorScheme="primary"
            leftIcon={<Icon.PlusCircle size={18} />}
            onClick={() => {
              setVisibleAddressForm(true);
              setVisibleDeviceForm(false);
              setVisiblePhoneForm(false);
            }}
          >
            New Address
          </AppButton>
          <AppButton
            colorScheme="primary"
            leftIcon={<Icon.PlusCircle size={18} />}
            onClick={() => {
              setVisibleDeviceForm(true);
              setVisibleAddressForm(false);
              setVisiblePhoneForm(false);
            }}
          >
            New Device
          </AppButton>
          <AppButton
            colorScheme="primary"
            leftIcon={<Icon.PlusCircle size={18} />}
            onClick={() => {
              setVisiblePhoneForm(true);
              setVisibleDeviceForm(false);
              setVisibleAddressForm(false);
            }}
          >
            New Phone Number
          </AppButton>
        </div>
      )}
      {visibleDeviceForm && (
        <div className="col-span-12">
          <DeviceForm
            onClose={() => setVisibleDeviceForm(false)}
            idDefendant={idDefendant}
          />
        </div>
      )}
      {visibleAddressForm && (
        <div className="col-span-12">
          <AddressForm onClose={() => setVisibleAddressForm(false)} />
        </div>
      )}
      {visiblePhoneForm && (
        <div className="col-span-12">
          <PhoneForm onClose={() => setVisiblePhoneForm(false)} />
        </div>
      )}
      <div className="col-span-12 mt-5 border flex">
        <div className="w-full">
          <div className="w-full rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                    Devices
                    <Icon.ChevronRight
                      className={open ? 'rotate-90 transform' : ''}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    <AppDevicessTable onEdit={() => {}} onDelete={() => {}} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                    Addresses
                    <Icon.ChevronRight
                      className={open ? 'rotate-90 transform' : ''}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    <AppDevicessTable onEdit={() => {}} onDelete={() => {}} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </>
  );
};
