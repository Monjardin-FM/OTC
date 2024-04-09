import React from 'react';
import { UIColorScheme } from 'presentation/types/ui-color-schema';

export const AppAlertContext = React.createContext<{
  colorSchema?: UIColorScheme;
}>({
  colorSchema: 'gray',
});
