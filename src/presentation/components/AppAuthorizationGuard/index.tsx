import React, { ReactNode } from 'react';
import { Redirect } from 'react-router';
import { UserRole } from 'modules/user/domain/entities/user-role';
import { useAuthorizationGuard } from 'presentation/hooks/use-authorization-guard';

export type AppAuthorizationGuardProps = {
  children?: ReactNode;
  roles?: UserRole[];
  redirect?: {
    to?: string;
  };
};

export const AppAuthorizationGuard = ({
  children,
  roles = [],
  redirect,
}: AppAuthorizationGuardProps) => {
  const [fetched, isValid] = useAuthorizationGuard({
    roles,
  });

  return (
    <>
      {fetched && (
        <>
          {!redirect?.to && isValid && children}
          {redirect?.to && (
            <>{isValid ? children : <Redirect to={redirect.to} />}</>
          )}
        </>
      )}
    </>
  );
};
