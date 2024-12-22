import React from 'react';
import { Navbar, Logo, NotificationBell } from '@shared/components';
import { GlobalSearch } from '@widgets/GlobalSearch';

import { SContainer, SMainProfile, STitle, SWrapper } from './header.styled';

export const Header = () => {
  return (
    <SContainer>
      <SWrapper>
        <Logo sizeBg="40px" shadow size={20} color="white" title="right">
          <STitle>Discord</STitle>
        </Logo>
        <Navbar />
        <GlobalSearch />
        <NotificationBell />
        <SMainProfile />
      </SWrapper>
    </SContainer>
  );
};
