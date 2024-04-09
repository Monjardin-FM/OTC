import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

export interface IRoute {
  key: string | number;
  path: string;
  exact?: boolean;
  component: React.ComponentType<any>;
  routes?: IRoute[];
}

export interface AppRouterProps {
  routes?: IRoute[];
}

export const AppRouter = ({ routes }: AppRouterProps) => (
  <>
    {routes && routes.length > 0 && (
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          {routes?.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <route.component routes={route.routes ?? []} {...props} />
              )}
            />
          ))}
        </Switch>
      </AnimatePresence>
    )}
  </>
);
