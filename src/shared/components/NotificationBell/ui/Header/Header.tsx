import React, { FC } from 'react';
import { Close } from '@shared/assets';

import { IHeaderNotification } from '../../model/notificationBell.types';
import { Container } from './header.styles';

const Header: FC<IHeaderNotification> = ({ deleteAllNotification }) => {
  return (
    <Container>
      <div>Оповещения для вашей страницы</div>
      <Close fontSize={20} onClick={deleteAllNotification} />
    </Container>
  );
};

export default Header;
