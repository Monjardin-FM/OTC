import React, { useRef } from 'react';
import * as Icon from 'react-feather';
import { Redirect } from 'react-router-dom';
import { useToggle, useClickAway } from 'react-use';
import { AppRouter, IRoute } from 'presentation/components/AppRouter';
import { useMargin } from 'presentation/hooks/use-margin';
import { useUser } from 'modules/user/web/hooks/use-user';
import { AppAsideV2 } from '../AppAside';
import { AppPageTransition } from '../AppPageTransition';
import { AppDevelopmentNotification } from '../app-development-notification';

export type AppLayoutProps = {
  routes?: IRoute[];
};

export const AppLayout = ({ routes = [] }: AppLayoutProps) => {
  const margin = useMargin();
  const { user } = useUser();

  const ref = useRef(null);
  const [on, toggle] = useToggle(false);
  useClickAway(ref, () => toggle(false));

  return (
    <>
      {!user ? (
        <Redirect to={'/sign'} />
      ) : (
        <AppPageTransition>
          <AppDevelopmentNotification />

          <button
            onClick={() => toggle(true)}
            style={{ left: margin }}
            className="p-3 rounded-full bg-gray-100 text-gray-700 top-6 inline-block absolute shadow appearance-none focus:outline-none z-30"
          >
            <Icon.Menu size={20} />
          </button>

          <AppAsideV2
            isVisible={on}
            onClose={() => {
              toggle(false);
            }}
          />

          <div
            className="w-full min-h-screen bg-gray-50 bg-opacity-50 pb-5
          "
          >
            <AppRouter routes={routes} />
          </div>
        </AppPageTransition>
      )}
    </>
  );
};
