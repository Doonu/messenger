import React from 'react';
import BaseContainer from '../../../components/layouts/base';
import { useAppSelector } from '../../../hooks/redux';
import { selectorProfile } from '../../../entities';

const Home = () => {
  const user = useAppSelector(selectorProfile);

  return <BaseContainer>{user.name}</BaseContainer>;
};

export default Home;
