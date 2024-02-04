import React from 'react';

import { SContainer, SMainProfile, STitle, SWrapper } from './header.styled';
import Navbar from '../../../custom/navbar';
import Logo from '../../../custom/logo';
import GlobalSearch from '../../../../widgets/globalSearch/ui/SearchForm';

const Header = () => {
  //TODO: Сделать для мобилки

  return (
    <SContainer>
      <SWrapper>
        <Logo $shadow size={20} color="white" title={'right'}>
          <STitle>Discord</STitle>
        </Logo>
        <Navbar />
        <GlobalSearch />
        <SMainProfile />
      </SWrapper>
    </SContainer>
  );
};

export default Header;
