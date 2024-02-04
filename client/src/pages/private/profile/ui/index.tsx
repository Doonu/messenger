import React from 'react';
import BaseContainer from '../../../../components/layouts/base';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  return <BaseContainer>{params.id}</BaseContainer>;
};

export default Profile;
