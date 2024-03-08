import React, { FC } from 'react';
import { IUser } from '../../shared/models/IUser';
import { SName, STitle, SUser, SUsers } from './friends.styled';
import { BlockContainer } from '../../shared/styles/containers';
import PhotoProfile from '../../components/custom/profiles/photo';
import { convertName } from '../../shared/util/user';
import { useNavigate } from 'react-router-dom';

interface IFriends {
  friends: IUser[];
  title: string;
  count: number;
}

const Friends: FC<IFriends> = ({ friends, title, count }) => {
  const navigate = useNavigate();

  return (
    <BlockContainer>
      <STitle>
        <span>{title}</span> {count}
      </STitle>
      <SUsers>
        {friends.slice(0, 4).map((friend) => (
          <SUser
            onClick={() => navigate(`/profile/${friend.id}`)}
            title={convertName(friend.name)}
            key={friend.id}
          >
            <PhotoProfile fontSize={30} size={60} img={friend.avatar} name={friend.name} />
            <SName>{convertName(friend.name)}</SName>
          </SUser>
        ))}
      </SUsers>
    </BlockContainer>
  );
};

export default Friends;
