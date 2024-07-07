import { ComponentType, lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Dialogs = lazy(() => import('../../pages/private/Dialogs'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Favorite = lazy(() => import('../../pages/private/Favorite'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Login = lazy(() => import('../../pages/public/login'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Registration = lazy(() => import('../../pages/public/Registration'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Feed = lazy(() => import('../../pages/private/Feed'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Profile = lazy(() => import('../../pages/private/Profile'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Users = lazy(() => import('../../pages/private/Users'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Chat = lazy(() => import('../../pages/private/Chat'));

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
  CHAT = '/dialog/:id',
}

export enum RoutesNamesPublic {
  LOGIN = '/',
  REGISTER = '/registration',
}

export const privateRoutes: IRoute[] = [
  { path: RoutesNamesPrivate.PROFILE, component: Profile, type: 'Profile' },
  { path: RoutesNamesPrivate.DIALOG, component: Dialogs, type: 'Dialog' },
  { path: RoutesNamesPrivate.FAVORITE, component: Favorite, type: 'Favorite' },
  { path: RoutesNamesPrivate.FEED, component: Feed, type: 'Feed' },
  { path: RoutesNamesPrivate.USERS, component: Users, type: 'Users' },
  { path: RoutesNamesPrivate.CHAT, component: Chat, type: 'Chat' },
];

export const publicRoutes: IRoute[] = [
  { path: RoutesNamesPublic.LOGIN, component: Login, type: 'Login' },
  { path: RoutesNamesPublic.REGISTER, component: Registration, type: 'Register' },
];
