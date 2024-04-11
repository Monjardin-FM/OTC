import React, { useEffect } from 'react';
import { AppButton } from 'presentation/components/AppButton';
import {
  AppModal,
  AppModalBody,
  AppModalContent,
  AppModalFooter,
  AppModalHeader,
  AppModalOverlay,
} from 'presentation/components/AppModal';
import { AppFormField, AppFormLabel } from 'presentation/components/AppForm';
import AppTextField from 'presentation/components/AppTextField';
import AppSelect from 'presentation/components/AppSelect';
import { Switch } from '@nextui-org/react';
import { useGetCounties } from '../../hooks/use-get-county';
import { useGetGenders } from '../../hooks/use-get-genders';
import { useGetRoles } from '../../hooks/use-get-roles';
export type AppNewUserModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppNewUserModal = ({
  isVisible,
  onClose,
}: AppNewUserModalProps) => {
  //   const [enabled, setEnabled] = useState(false);
  const { counties, getCounties } = useGetCounties();
  const { genders, getGenders } = useGetGenders();
  const { roles, getRoles } = useGetRoles();
  useEffect(() => {
    getCounties();
    getGenders();
    getRoles();
  }, []);
  return (
    <AppModal isVisible={isVisible} onClose={onClose} size="3xl">
      <AppModalOverlay>
        <AppModalContent>
          <AppModalHeader>New User</AppModalHeader>
          <AppModalBody>
            <div className="grid grid-cols-12 gap-y-4 gap-x-3">
              <AppFormField className="col-span-6">
                <AppFormLabel>Name</AppFormLabel>
                <AppTextField />
              </AppFormField>
              <AppFormField className="col-span-6">
                <AppFormLabel>Last Name</AppFormLabel>
                <AppTextField />
              </AppFormField>
              <AppFormField className="col-span-12">
                <AppFormLabel>Email</AppFormLabel>
                <AppTextField />
              </AppFormField>
              <AppFormField className="col-span-6">
                <AppFormLabel>Role</AppFormLabel>
                <AppSelect>
                  <option value="">Select Role</option>
                  {roles?.map((role) => (
                    <option key={role.idRole} value={role.idRole}>
                      {role.role}
                    </option>
                  ))}
                </AppSelect>
              </AppFormField>
              <AppFormField className="col-span-6">
                <AppFormLabel>Role</AppFormLabel>
                <AppSelect>
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
                <AppSelect>
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
                <AppTextField />
              </AppFormField>
              <AppFormField className="col-span-6">
                <AppFormLabel>Status</AppFormLabel>
                <div className="flex flex-row items-center justify-center gap-5">
                  <span>Inactive</span>
                  <Switch></Switch>
                  <span>Active</span>
                </div>
              </AppFormField>
            </div>
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
