import React, { useEffect, useState } from 'react';
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { AppButton } from 'presentation/components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAssignAddress } from '../../hooks/use-assign-address';
import { AppToast } from 'presentation/components/AppToast';
import { useGetCity } from 'modules/catalog/hooks/use-get-city';
import Select from 'react-select';
import { AppToggleButton } from 'presentation/components/AppToggleButton';

export type AddressFormProps = {
  onClose: () => void;
  idDefendant?: number;
  onReload: () => void;
};
type createAddressDefendantFormValue = {
  idAddressType: number;
  zipCode: string;
  streetAvenue: string;
};
export const AddressForm = ({
  onClose,
  idDefendant,
  onReload,
}: AddressFormProps) => {
  const { cities, getCities } = useGetCity();
  const [citiesOptions, setCitiesOptions] =
    useState<{ value: number; label: string }[]>();
  const {
    assignAddress,
    loading: loadingAddress,
    error: errorAddress,
  } = useAssignAddress();
  const [idCity, setIdCity] = useState<number>();
  const [idStatus, setIdStatus] = useState(false);

  const validationSchemaDefendant = Yup.object().shape({
    idAddressType: Yup.number()
      .moreThan(0, 'Select an Address Type')
      .required('Select an Address Type'),
    zipCode: Yup.string().required('Required zip code'),
    streetAvenue: Yup.string().required('Required Street/Avenue'),
  });
  const onSubmitHandler = async (data: createAddressDefendantFormValue) => {
    await assignAddress({
      idAddressType: Number(data.idAddressType),
      idCity: Number(idCity),
      idStatus: idStatus ? 1 : 0,
      streetAvenue: data.streetAvenue,
      zipCode: data.zipCode,
    });
    if (!errorAddress) {
      AppToast().fire({
        title: 'Success',
        text: 'The address was created successfully',
        icon: 'success',
      });
    }
    onReload();
  };
  useEffect(() => {
    if (errorAddress) {
      AppToast().fire({
        title: 'Error',
        text: 'An error occurred while saving information',
        icon: 'error',
      });
    }
  }, [errorAddress]);
  useEffect(() => {
    getCities();
  }, []);
  useEffect(() => {
    if (cities) {
      setCitiesOptions(
        cities.map((city) => ({
          value: city.idCity,
          label: city.city,
        })),
      );
    }
  }, [cities]);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <Formik
        initialValues={{
          idAddressType: 0,
          zipCode: '',
          streetAvenue: '',
        }}
        enableReinitialize
        validationSchema={validationSchemaDefendant}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="col-span-12 grid grid-cols-12 gap-4"
          >
            <AppFormField className="col-span-3">
              <AppFormLabel>Type Address</AppFormLabel>
              <AppSelect
                name="idAddressType"
                value={values.idAddressType}
                onChange={handleChange}
              >
                <option value={0} key={0}>
                  Select Type Address
                </option>
                <option value={1} key={1}>
                  Home
                </option>
                <option value={2} key={2}>
                  Work
                </option>
              </AppSelect>
              {errors.idAddressType && (
                <AppFormHelperText colorSchema="danger">
                  {errors.idAddressType}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3 ">
              <AppFormLabel>Street/Avenue</AppFormLabel>
              <AppTextField
                name="streetAvenue"
                value={values.streetAvenue}
                onChange={handleChange}
              />
              {errors.streetAvenue && (
                <AppFormHelperText colorSchema="danger">
                  {errors.streetAvenue}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>Zip Code</AppFormLabel>
              <AppTextField
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
              />
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>City</AppFormLabel>
              <Select
                options={citiesOptions}
                isSearchable
                onChange={(e) => setIdCity(e?.value)}
              />
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>Status</AppFormLabel>
              <div className="flex flex-row items-center justify-start gap-3">
                <span>Inactive</span>

                {idStatus ? (
                  <AppToggleButton
                    name="status"
                    onChange={() => setIdStatus(!idStatus)}
                    checked={idStatus}
                  ></AppToggleButton>
                ) : (
                  <AppToggleButton
                    name="status"
                    onChange={() => setIdStatus(!idStatus)}
                    checked={idStatus}
                  ></AppToggleButton>
                )}
                <span>Active</span>
              </div>
            </AppFormField>
            <div className="col-span-12 flex flex-row items-center justify-end gap-4">
              <AppButton onClick={onClose}>Cancel</AppButton>
              <AppButton
                colorScheme="primary"
                type="submit"
                isLoading={loadingAddress}
                isDisabled={loadingAddress}
              >
                Save
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
