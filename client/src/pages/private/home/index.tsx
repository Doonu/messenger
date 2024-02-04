import React from 'react';
import BaseContainer from '../../../components/layouts/base';
import { useAppSelector } from '../../../hooks/redux';
import { selectorUser } from '../../../entities/user/user.selectors';

const Home = () => {
  const user = useAppSelector(selectorUser);

  return <BaseContainer>{user.name}</BaseContainer>;
};

export default Home;
