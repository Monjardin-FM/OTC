import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AppRouterBridge } from './AppRouterBridge';
import reportWebVitals from './reportWebVitals';
import { NextUIProvider } from '@nextui-org/react';
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('es');

ReactDOM.render(
  <React.StrictMode>
    <NextUIProvider>
      <AppRouterBridge />
    </NextUIProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
