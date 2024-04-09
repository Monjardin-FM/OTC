import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLoading } from 'presentation/components/AppLoading';
import { IRoute, AppRouter } from 'presentation/components/AppRouter';

const App = React.lazy(() => import('./App'));

function AppWrap() {
  return (
    <Suspense fallback={<AppLoading />}>
      <App />
    </Suspense>
  );
}

export const AppRouterBridge = () => {
  const routes: IRoute[] = [
    {
      key: 'APP',
      component: AppWrap,
      path: '/',
      exact: false,
    },
  ];
  return (
    <Router>
      <AppRouter routes={routes} />
    </Router>
  );
};
