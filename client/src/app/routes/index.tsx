import { ComponentType, lazy } from 'react';

// TODO: разобраться с этим
// @ts-ignore
const Dialog = lazy(() => import('../../pages/private/dialog'));
// @ts-ignore
const Favorite = lazy(() => import('../../pages/private/favorite'));
// @ts-ignore
const Login = lazy(() => import('../../pages/public/login'));
// @ts-ignore
const Registration = lazy(() => import('../../pages/public/registration'));
// @ts-ignore
const Feed = lazy(() => import('../../pages/private/feed/ui'));
// @ts-ignore
const Profile = lazy(() => import('../../pages/private/profile'));
// @ts-ignore
const Users = lazy(() => import('../../pages/private/users'));

export interface IRoute {
  path: string;
  component: ComponentType;
  type: string;
  description?: string;
}

export enum RoutesNamesPrivate {
  PROFILE = '/profile/:id',
  DIALOG = '/dialog',
  FAVORITE = '/favorite',
  FEED = '/',
  USERS = '/friends',
}

export enum RoutesNamesPublic {
  LOGIN = '/',
  REGISTER = '/registration',
}

export const privateRoutes: IRoute[] = [
  { path: RoutesNamesPrivate.PROFILE, component: Profile, type: 'Profile' },
  { path: RoutesNamesPrivate.DIALOG, component: Dialog, type: 'Dialog' },
  { path: RoutesNamesPrivate.FAVORITE, component: Favorite, type: 'Favorite' },
  { path: RoutesNamesPrivate.FEED, component: Feed, type: 'Feed' },
  { path: RoutesNamesPrivate.USERS, component: Users, type: 'Users' },
];

export const publicRoutes: IRoute[] = [
  { path: RoutesNamesPublic.LOGIN, component: Login, type: 'Login' },
  { path: RoutesNamesPublic.REGISTER, component: Registration, type: 'Register' },
];
