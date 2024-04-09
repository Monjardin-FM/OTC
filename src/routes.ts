import { AppUserAuth } from 'modules/user/web/components/AppUserAuthPage';
import { IRoute } from 'presentation/components/AppRouter';
import { AppHomePage } from 'presentation/components/AppHomePage';
import { AppLayout } from 'presentation/components/AppLayout';
import { AppNotFoundPage } from 'presentation/components/AppNotFoundPage';
import { ManagementUsersManagerPage } from 'modules/management-users/web/components/app-management-users-manager-page';

export const routes: IRoute[] = [
  {
    key: 'auth-user',
    path: '/sign',
    component: AppUserAuth,
  },
  {
    key: 'private-layout',
    path: '/',
    component: AppLayout,
    routes: [
      {
        key: 'clients-view',
        path: '/clients',
        component: ManagementUsersManagerPage,
      },

      {
        key: 'home-view',
        path: '/',
        exact: true,
        component: AppHomePage,
      },
    ],
  },
  {
    key: 'page-not-found',
    path: '*',
    component: AppNotFoundPage,
  },
];
