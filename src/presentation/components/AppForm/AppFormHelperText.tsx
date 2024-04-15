import React from 'react';
import classNames from 'classnames';
import { UIColorScheme } from 'presentation/types/ui-color-schema';

export interface AppFormHelperTextProps
  extends React.ComponentPropsWithoutRef<'div'> {
  colorSchema?: UIColorScheme;
}

export const AppFormHelperText = ({
  children,
  className,
  colorSchema = 'gray',
  ...props
}: AppFormHelperTextProps) => (
  <span
    className={classNames(
      'block mt-0 text-sm pl-1 leading-snug font-medium text-gray-500 border ',
      {
        'text-gray-500': colorSchema === 'gray',
        'text-primary-500': colorSchema === 'primary',
        'text-success-500': colorSchema === 'success',
        'text-info-500': colorSchema === 'info',
        'text-warn-500': colorSchema === 'warn',
        'text-danger-600 border-danger-100 rounded-md bg-danger-200 p-2':
          colorSchema === 'danger',
      },
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
