import React from 'react';

import { SContainer, SMainProfile, STitle, SWrapper } from './header.styled';
import Navbar from '../../../custom/navbar';
import Logo from '../../../custom/logo';
import GlobalSearch from '../../../../widgets/globalSearch/ui/SearchForm';
import NotificationBell from '../../../custom/notificationBell';

const Header = () => {
  return (
    <SContainer>
      <SWrapper>
        <Logo sizeBg="40px" shadow size={20} color="white" title={'right'}>
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

export default Header;
