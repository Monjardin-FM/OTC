import React, { useEffect } from 'react';
import * as Icon from 'react-feather';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  AppFormLabel,
  AppFormHelperText,
  AppFormField,
} from 'presentation/components/AppForm';
import { AppButton } from 'presentation/components/AppButton';
import AppTextField from 'presentation/components/AppTextField';
import { AppToast } from 'presentation/components/AppToast';
import { useUser } from 'modules/user/web/hooks/use-user';

export const AppUserAuthForm = () => {
  const { signIn, loading, error } = useUser();

  useEffect(() => {
    if (error) {
      AppToast().fire({ icon: 'info', title: 'Failed authentication' });
    }
  }, [error]);

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Invalid email')
        .required('An email is required'),
      password: Yup.string().trim().required('Required Password'),
    }),
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      signIn.execute({ email, password });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <AppFormField className="mt-7" isRequired>
        <AppFormLabel textColor="black" htmlFor="email">
          Email
        </AppFormLabel>
        <AppTextField
          colorSchema={
            formik.touched.email && formik.errors.email ? 'danger' : 'gray'
          }
          id="email"
          name="email"
          type="email"
          leftIcon={<Icon.Mail size={20} />}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <AppFormHelperText colorSchema="danger">
            {formik.errors.email}
          </AppFormHelperText>
        )}
      </AppFormField>

      <AppFormField className="mt-5" isRequired>
        <AppFormLabel textColor="black" htmlFor="password">
          Password
        </AppFormLabel>
        <AppTextField
          colorSchema={
            formik.touched.password && formik.errors.password
              ? 'danger'
              : 'gray'
          }
          id="password"
          name="password"
          type="password"
          leftIcon={<Icon.Lock size={20} />}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <AppFormHelperText colorSchema="danger">
            {formik.errors.password}
          </AppFormHelperText>
        )}
      </AppFormField>
      <div className="w-full flex items-center justify-center">
        <AppButton
          isLoading={loading === 'pending'}
          type="submit"
          colorScheme="primary"
          className="w-1/2 mt-10"
          size="base"
        >
          Sign In
        </AppButton>
      </div>
    </form>
  );
};
