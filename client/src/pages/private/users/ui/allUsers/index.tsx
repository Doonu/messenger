import React, { FC } from 'react';
import { SContainerUsers, SText, STitle } from '../user.styled';
import BaseButton from '../../../../../components/ui/buttons/baseButton';
import { TbListSearch } from 'react-icons/tb';
import { Friend } from '../../../../../widgets/items/friend';
import { IUserExcept } from '../../../../../shared/api/http/user/getUsersExceptFriends';

interface IAllUsers {
  users: IUserExcept[];
}

const AllUsers: FC<IAllUsers> = ({ users }) => {
  return (
    <div>
      {!!users.length && (
        <SContainerUsers>
          <STitle>
            <SText>Другие пользователи</SText>
            <BaseButton
              color="primary"
              leftIcon={<TbListSearch size={15} />}
              variant="secondary"
              bgTransparent
            >
              Расширенный поиск
            </BaseButton>
          </STitle>
          {users.map((user) => (
            <Friend key={user.id} user={user} type="notFriend" />
          ))}
        </SContainerUsers>
      )}
    </div>
  );
};

export default AllUsers;
