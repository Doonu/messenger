import React, { FC } from 'react';
import { convertName } from '@shared/util';
import { PhotoProfile } from '@shared/components';
import { useNavigate } from 'react-router-dom';

import { IListFriends } from '../../model/IFriends';
import { SContainer, SName, STitle, SUser, SUsers } from './ListFriends.styles';

const ListFriends: FC<IListFriends> = ({ users, title, isBorder = false }) => {
  const navigate = useNavigate();

  return (
    <SContainer $isBorder={isBorder}>
      <STitle onClick={() => navigate('/Friends')}>
        <span>{title}</span> {users.length}
      </STitle>
      <SUsers>
        {users.slice(0, 4).map((friend) => (
          <SUser
            onClick={() => navigate(`/profile/${friend.id}`)}
            title={convertName(friend.name)}
            key={friend.id}
          >
            <PhotoProfile
              status={friend.statusConnected}
              fontSize={30}
              size={60}
              img={friend.avatar}
              name={friend.name}
            />
            <SName>{convertName(friend.name)}</SName>
          </SUser>
        ))}
      </SUsers>
    </SContainer>
  );
};

export default ListFriends;
