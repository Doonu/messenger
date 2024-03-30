import React from 'react';
import { Container, SDescription, SItem, SLink } from './navbar.styled';
import { NavbarDto } from '../lib/dto';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';
import { selectorProfile } from '../../../../entities';

//TODO: Перенести в widgets

const Navbar = () => {
  const locate = useLocation();
  const { id } = useAppSelector(selectorProfile);
  // TODO: Подумать как будут приходить нотификации
  return (
    <Container>
      {NavbarDto.map((value) => {
        const path = value.type === 'Profile' ? `/profile/${id}` : value.path;
        const baseActive = locate.pathname === value.path;
        const active = value.type === 'Profile' ? locate.pathname === `/profile/${id}` : baseActive;

        return (
          <SLink $active={active} to={path} replace key={value.path}>
            <SItem>
              <value.component />
              <SDescription>{value.description}</SDescription>
            </SItem>
          </SLink>
        );
      })}
    </Container>
  );
};

export default Navbar;
