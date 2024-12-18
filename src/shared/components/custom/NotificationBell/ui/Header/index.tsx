import React, { FC } from 'react';
import { Close } from '@shared/assets';

import { IHeaderNotification } from '../../model/INotificationBell.style';
import { Container } from './header.styled';

const Header: FC<IHeaderNotification> = ({ deleteAllNotification }) => {
  return (
    <Container>
      <div>Оповещения для вашей страницы</div>
      <Close fontSize={20} onClick={deleteAllNotification} />
    </Container>
  );
};

export default Header;
