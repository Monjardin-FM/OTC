import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppHeading } from 'presentation/components/AppHeading';
import { AppText } from 'presentation/components/AppText';
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
              <div className="max-w-3xl py-8 px-14 bg-white bg-opacity-60 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm border border-white border-opacity-10 shadow-xl mx-2">
                <div className="w-full max-w-md mx-auto">
                  <div className="rounded-xl p-3 ">
                    <div>
                      <img
                        className="mx-auto w-24"
                        src={OTCLogo}
                        alt="OTC Logo"
                      />
                    </div>
                    <AppHeading
                      size="lg"
                      className="text-primary-900 text-center mt-5"
                    >
                      Welcome
                    </AppHeading>
                    <AppText className="text-primary-800 text-center" size="sm">
                      Do not you have an account? Contact your service provider
                      to obtain one.
                    </AppText>
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
