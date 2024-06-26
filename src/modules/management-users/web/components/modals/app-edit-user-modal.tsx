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
import AppSelect from 'presentation/components/AppSelect';
import AppTextField from 'presentation/components/AppTextField';
import { AppToggleButton } from 'presentation/components/AppToggleButton';
import { useGetCounties } from '../../hooks/use-get-county';
import { useGetGenders } from '../../hooks/use-get-genders';
import { useGetRoles } from '../../hooks/use-get-roles';
import { useGetUserById } from '../../hooks/use-get-user-by-id';
import { Formik } from 'formik';
import { useUpdateUser } from '../../hooks/use-update-user';
import { AppToast } from 'presentation/components/AppToast';
import * as Yup from 'yup';

export type AppEditUserModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  idUser?: number | null;
};
type UserUpdateFormValues = {
  name: string;
  lastName: string;
  eMail: string;
  role: number;
  county: number;
  gender: number;
  password: string;
};
export const AppEditUserModal = ({
  isVisible,
  onClose,
  onReload,
  idUser,
}: AppEditUserModalProps) => {
  const { counties, getCounties } = useGetCounties();
  const { genders, getGenders } = useGetGenders();
  const { roles, getRoles } = useGetRoles();
  const { getUserById, user } = useGetUserById();
  const { updateUser, loading, error: errorUpdate } = useUpdateUser();
  const [status, setStatus] = useState(false);
  const validationSchemaUpdateUser = Yup.object().shape({
    name: Yup.string().required('Required name'),
    lastName: Yup.string().required('Required last name'),
    eMail: Yup.string().required('Required email'),
    role: Yup.number().moreThan(0, 'Select a role').required('Select a role'),
    county: Yup.number()
      .moreThan(0, 'Select a county')
      .required('Select a County'),
    gender: Yup.number()
      .moreThan(0, 'Select a gender')
      .required('Select a gender'),
    password: Yup.string().required('Required password'),
  });
  const onSubmitHandler = async (data: UserUpdateFormValues) => {
    if (user) {
      await updateUser({
        idPerson: user?.idPerson,
        completeName: `${data.name} ${data.lastName}`,
        name: data.name,
        lastName: data.lastName,
        idCounty: Number(data.county),
        idGender: Number(data.gender),
        idRole: Number(data.role),
        idStatus: status ? 1 : 0,
        password: data.password,
      });
      onClose();
      onReload();
    }
  };
  useEffect(() => {
    if (idUser) {
      getUserById({ completeName: '', idUser: idUser });
    }
    getRoles();
    getCounties();
    getGenders();
  }, [idUser]);
  useEffect(() => {
    if (user) {
      setStatus(user.idStatus === 1);
    }
  }, [idUser]);
  useEffect(() => {
    if (errorUpdate) {
      AppToast().fire({
        title: 'Error',
        text: 'An error occurred while saving information',
        icon: 'error',
      });
    }
  }, [errorUpdate]);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="3xl">
      <AppModalOverlay>
        <AppModalContent>
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ? user.name : '',
              lastName: user?.lastName ? user.name : '',
              eMail: user?.eMail ? user.eMail : '',
              role: user?.idRole ? user.idRole : 0,
              county: user?.idCounty ? user.idCounty : 0,
              gender: user?.idGender ? user.idGender : 0,
              // status: user?.idStatus ? user.idStatus : 0,
              password: '',
            }}
            validationSchema={validationSchemaUpdateUser}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <AppModalHeader>Edit User</AppModalHeader>
                <AppModalBody>
                  <div className="grid grid-cols-12 gap-y-4 gap-x-3">
                    <AppFormField className="col-span-6">
                      <AppFormLabel>Name</AppFormLabel>
                      <AppTextField
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>Last Name</AppFormLabel>
                      <AppTextField
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </AppFormField>
                    <AppFormField className="col-span-12">
                      <AppFormLabel>Email</AppFormLabel>
                      <AppTextField
                        name="eMail"
                        value={values.eMail}
                        onChange={handleChange}
                        disabled
                      />
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>Role</AppFormLabel>
                      <AppSelect
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        {roles?.map((role) => (
                          <option key={role.idRole} value={role.idRole}>
                            {role.role}
                          </option>
                        ))}
                      </AppSelect>
                    </AppFormField>
                    <AppFormField className="col-span-6">
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
                    </AppFormField>
                    <AppFormField className="col-span-6">
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
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>Password</AppFormLabel>
                      <AppTextField
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        type="password"
                      />
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>Status</AppFormLabel>
                      <div className="flex flex-row items-center justify-start gap-5">
                        <span>Inactive</span>
                        {status ? (
                          <AppToggleButton
                            name="status"
                            // value={status}
                            onChange={() => setStatus(!status)}
                            checked={status}
                          ></AppToggleButton>
                        ) : (
                          <AppToggleButton
                            name="status"
                            // value={values.status}
                            onChange={() => setStatus(!status)}
                            checked={status}
                          ></AppToggleButton>
                        )}

                        <span>Active</span>
                      </div>
                    </AppFormField>
                  </div>
                </AppModalBody>
                <AppModalFooter>
                  <AppButton onClick={onClose}>Cancel</AppButton>
                  <AppButton
                    colorScheme="primary"
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                  >
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
