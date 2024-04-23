import React, { useEffect, useState } from 'react';
import { AppButton } from 'presentation/components/AppButton';
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from 'presentation/components/AppForm';
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import AppDatePicker from 'presentation/components/AppDatePicker';
import { useToggle } from 'react-use';
import { AddressForm } from './address-form';
import { Formik } from 'formik';
import { useSaveVictim } from 'modules/victim/web/hooks/use-create-victim';
import * as Yup from 'yup';
import { AppToast } from 'presentation/components/AppToast';
import * as Icon from 'react-feather';
import { useGetGenders } from 'modules/management-users/web/hooks/use-get-genders';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import dayjs from 'dayjs';
export type AddVictimFormProps = {
  onClose: () => void;
  idDefendant?: number;
  onReload: () => void;
};
type createVictimFormValue = {
  name: string;
  lastName: string;
  eMail: string;
  caseNumber: string;
  idGender: number;
  password: string;
};
export const AddVictimForm = ({
  onClose,
  idDefendant,
  onReload,
}: AddVictimFormProps) => {
  const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const { genders, getGenders } = useGetGenders();
  const [statusVictim, setStatusVictim] = useState(false);

  const {
    createVictim,
    error: errorVictim,
    loading: loadingVictim,
  } = useSaveVictim();
  const validationSchemaVictim = Yup.object().shape({
    name: Yup.string().required('Required name'),
    lastName: Yup.string().required('Required last name'),
    caseNumber: Yup.string().required('Required case number'),
    eMail: Yup.string().required('Required email'),
    idGender: Yup.number()
      .moreThan(0, 'Select a gender')
      .required('Select gender'),
    password: Yup.string().required('Required password'),
  });
  const onSubmitHandler = async (data: createVictimFormValue) => {
    await createVictim({
      name: data.name,
      lastName: data.lastName,
      completeName: `${data.name} ${data.lastName}`,
      caseNumber: data.caseNumber,
      eMail: data.eMail,
      idDefendant: Number(idDefendant),
      idGender: data.idGender,
      password: data.password,
      idStatus: statusVictim ? 1 : 0,
      birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
    });
    if (!errorVictim) {
      AppToast().fire({
        title: 'Success',
        text: 'The victim was created successfully',
        icon: 'success',
      });
    }
    onReload();
  };
  useEffect(() => {
    if (errorVictim) {
      AppToast().fire({
        title: 'Error',
        text: 'An error occurred while saving information',
        icon: 'error',
      });
    }
  }, [errorVictim]);
  useEffect(() => {
    getGenders();
  }, []);
  return (
    <Formik
      initialValues={{
        name: '',
        lastName: '',
        caseNumber: '',
        eMail: '',
        idGender: 0,
        password: '',
      }}
      enableReinitialize
      validationSchema={validationSchemaVictim}
      onSubmit={onSubmitHandler}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6 bg-gray-200">
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
            <AppFormField className="col-span-3">
              <AppFormLabel>Status</AppFormLabel>
              <div className="flex flex-row items-center justify-start gap-3">
                <span>Inactive</span>

                {statusVictim ? (
                  <AppToggleButton
                    name="status"
                    onChange={() => setStatusVictim(!statusVictim)}
                    checked={statusVictim}
                  ></AppToggleButton>
                ) : (
                  <AppToggleButton
                    name="status"
                    onChange={() => setStatusVictim(!statusVictim)}
                    checked={statusVictim}
                  ></AppToggleButton>
                )}
                <span>Active</span>
              </div>
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>Email</AppFormLabel>
              <AppTextField
                name="eMail"
                value={values.eMail}
                onChange={handleChange}
              />
              {errors.eMail && (
                <AppFormHelperText colorSchema="danger">
                  {errors.eMail}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-4">
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
            <AppFormField className="col-span-4">
              <AppFormLabel>Date of Birth</AppFormLabel>
              <AppDatePicker
                selected={birthDate}
                leftIcon={<Icon.Calendar size={18} />}
                onChange={(date) => {
                  if (date instanceof Date) setBirthDate(date);
                }}
              />
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>Gender</AppFormLabel>
              <AppSelect
                name="idGender"
                value={values.idGender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                {genders?.map((gender) => (
                  <option key={gender.idGender} value={gender.idGender}>
                    {gender.gender}
                  </option>
                ))}
              </AppSelect>
              {errors.idGender && (
                <AppFormHelperText colorSchema="danger">
                  {errors.idGender}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-4">
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
            <div className="col-span-12">
              <AppButton
                onClick={() => setVisibleAddressForm(true)}
                colorScheme="primary"
              >
                New Address
              </AppButton>
            </div>
            <div className="grid grid-cols-12 gap-4 col-span-12">
              {visibleAddressForm && (
                <AddressForm
                  onClose={() => setVisibleAddressForm(false)}
                  onReload={() => {}}
                  // idDefendant={}
                />
              )}
            </div>
            <div className="col-span-12 flex flex-row items-center justify-end gap-4">
              <AppButton onClick={onClose}>Cancel</AppButton>
              <AppButton
                colorScheme="primary"
                type="submit"
                isLoading={loadingVictim}
                isDisabled={loadingVictim}
              >
                Save
              </AppButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
