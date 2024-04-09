import React, { useContext } from 'react';
import * as Icon from 'react-feather';
import { AppButton } from 'presentation/components/AppButton';
import { AppModalContext } from 'presentation/components/AppModal';

export const AppModalCloseButton = () => {
  const { onClose } = useContext(AppModalContext);
  return (
    <AppButton
      onClick={onClose}
      variant="ghost"
      className="absolute right-3 top-1"
    >
      <Icon.X size={20} />
    </AppButton>
  );
};
