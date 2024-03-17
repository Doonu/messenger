import React, { FC } from 'react';
import { Container } from './header.styled';
import { Close } from '../../../../../shared/assets/icons';

interface IHeaderNotification {
  deleteAllNotification: () => void;
}

const Header: FC<IHeaderNotification> = ({ deleteAllNotification }) => {
  return (
    <Container>
      <div>Оповещения для вашей страницы</div>
      <Close fontSize={20} onClick={deleteAllNotification} />
    </Container>
  );
};

export default Header;
