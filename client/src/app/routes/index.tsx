import { ComponentType, lazy } from 'react';

const Dialogs = lazy(() => import('../../pages/Dialogs'));
const Favorite = lazy(() => import('../../pages/Favorite'));
const Login = lazy(() => import('../../pages/login'));
const Registration = lazy(() => import('../../pages/Registration'));
const Feed = lazy(() => import('../../pages/Feed'));
const Profile = lazy(() => import('../../pages/Profile'));
const Users = lazy(() => import('../../pages/Users'));
const Chat = lazy(() => import('../../pages/Chat'));

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
