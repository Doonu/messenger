import React from 'react';
import { Container, SDescription, SItem, SLink, SNotify } from './navbar.styled';
import { NavbarDto } from '../lib/dto';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';
import { selectorUser } from '../../../../entities/user/user.selectors';

//TODO: Перенести в widgets

const Navbar = () => {
  const locate = useLocation();
  const { id } = useAppSelector(selectorUser);
  // TODO: Подумать как будут приходить нотификации
  return (
    <Container>
      {NavbarDto.map((value) => {
        const path = value.type === 'Profile' ? `profile/${id}` : value.path;
        const baseActive = locate.pathname === value.path;
        const active = value.type === 'Profile' ? locate.pathname === `profile/${id}` : baseActive;

        return (
          <SLink $active={active} to={path} replace key={value.path}>
            <SItem>
              <value.component />
              {false && <SNotify />}
              <SDescription>{value.description}</SDescription>
            </SItem>
          </SLink>
        );
      })}
    </Container>
  );
};

export default Navbar;
