import React, { useContext } from 'react';
import * as Icon from 'react-feather';
import { AppButton, AppButtonProps } from 'presentation/components/AppButton';
import { AppAlertContext } from './AppAlertContext';

export type AppAlertCloseButtonProps = Omit<
  AppButtonProps,
  'colorScheme' | 'variant'
>;

export const AppAlertCloseButton = (props: AppAlertCloseButtonProps) => {
  const { colorSchema } = useContext(AppAlertContext);
  return (
    <span className="flex-none pl-3">
      <AppButton variant="ghost" colorScheme={colorSchema} {...props}>
        <Icon.X />
      </AppButton>
    </span>
  );
};
