import { IRoute, RoutesNamesPrivate } from '../../../../app/routes';
import { AiFillHome, AiFillMessage } from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';

type NavbarProps = IRoute;

export const NavbarDto: NavbarProps[] = [
  {
    path: '/profile',
    type: 'Profile',
    component: AiFillHome,
    description: 'Профиль',
  },
  {
    path: RoutesNamesPrivate.FEED,
    type: 'Feed',
    component: BsNewspaper,
    description: 'Новости',
  },
  {
    path: RoutesNamesPrivate.DIALOG,
    type: 'Dialog',
    component: AiFillMessage,
    description: 'Мессенджер',
  },
  {
    path: RoutesNamesPrivate.FAVORITE,
    type: 'Favorite',
    component: MdFavorite,
    description: 'Любимые',
  },
];
