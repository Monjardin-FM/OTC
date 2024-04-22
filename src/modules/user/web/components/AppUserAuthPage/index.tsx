import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppHeading } from 'presentation/components/AppHeading';
import { AppUserAuthForm } from 'modules/user/web/components/AppUserAuthForm';
import { useUser } from 'modules/user/web/hooks/use-user';
import AuthPageBackground from 'presentation/assets/img/background-login.jpg';
import { AppBackgroundImageMotion } from 'presentation/components/AppBackgroundImageMotion';
import OTCLogo from 'presentation/assets/img/otcLogo-small.png';
import { AppPageTransition } from 'presentation/components/AppPageTransition';

export const AppUserAuth = () => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <AppPageTransition>
          <div className="flex min-h-screen min-w-full">
            <AppBackgroundImageMotion
              duration={18}
              backgroundImage={AuthPageBackground}
            >
              <div className="max-w-4xl flex py-8 px-36 bg-white bg-opacity-60 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm border border-white border-opacity-10 shadow-xl">
                <div className="w-full max-w-md ">
                  <div className="rounded-xl">
                    <img
                      className="mx-auto w-24"
                      src={OTCLogo}
                      alt="OTC Logo"
                    />
                    <AppHeading
                      size="lg"
                      className="text-primary-900 text-center mt-5"
                    >
                      Welcome
                    </AppHeading>
                  </div>
                  <AppUserAuthForm />
                </div>
              </div>
            </AppBackgroundImageMotion>
          </div>
        </AppPageTransition>
      )}
    </>
  );
};
