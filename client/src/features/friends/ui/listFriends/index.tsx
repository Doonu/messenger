import React, { FC } from 'react';
import { SContainer, SName, STitle, SUser, SUsers } from './ListFriends.styles';
import { convertName } from '../../../../shared/util/user';
import PhotoProfile from '../../../../components/custom/profiles/photo';
import { IUser } from '../../../../shared/models/IUser';
import { useNavigate } from 'react-router-dom';

interface IListFriends {
  title: string;
  users: IUser[];
  isBorder?: boolean;
}

const ListFriends: FC<IListFriends> = ({ users, title, isBorder = false }) => {
  const navigate = useNavigate();

  return (
    <SContainer $isBorder={isBorder}>
      <STitle onClick={() => navigate('/friends')}>
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
              statusTime={friend.timeConnected}
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
