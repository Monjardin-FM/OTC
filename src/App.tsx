import React from 'react';
import { Provider } from 'react-redux';
import './presentation/assets/css/index.css';
import './presentation/assets/css/file-uploader.css';
import 'react-toastify/dist/ReactToastify.css';
import './presentation/assets/css/react-datepicker.css';

import { store } from './store';
import {
  appContextDefaultValue,
  AppContext,
} from 'presentation/context/app.context';
import { AppRouter } from 'presentation/components/AppRouter';
import { routes } from 'routes';

const App = () => {
  return (
    <Provider store={store}>
      <AppContext.Provider value={appContextDefaultValue}>
        <AppRouter routes={routes} />
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
