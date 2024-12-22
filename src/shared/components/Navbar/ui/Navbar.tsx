import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';

import { optionsNavbar } from '../lib/optionsNavbar';
import { Container, SDescription, SItem, SLink } from './navbar.styles';

// TODO: Перенести в widgets

export const Navbar = () => {
  const locate = useLocation();
  const { id } = useAppSelector(selectorProfile);

  return (
    <Container>
      {optionsNavbar.map((value) => {
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
