import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Segment, BaseInput } from '@shared/components';
import { IUser } from '@shared/models';
import { Close, Magnifier } from '@shared/assets';

import { SContainer } from './navigate.styled';
import { generateOptions } from '../../../lib/options';

interface INavigate {
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  participants?: IUser[];
}

const Navigate: FC<INavigate> = ({ participants, setUsers }) => {
  const [choiceUser, setChoiceUser] = useState<string>('all');
  const [isSearch, setIsSearch] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  const options = participants ? generateOptions({ counts: [participants.length, 0] }) : [];

  const handlerSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const handlerSearchUsers = () => {
    if (participants && searchUser) {
      const result = participants.filter((user) => user.name.includes(searchUser));
      setUsers(result);
    }

    if (participants && !searchUser) {
      setUsers(participants);
    }
  };

  const handlerClose = () => {
    if (participants) setUsers(participants);
    setIsSearch(false);
  };

  useEffect(() => {
    handlerSearchUsers();
  }, [searchUser]);

  return (
    <SContainer>
      {!isSearch && (
        <Segment
          onChange={(value) => typeof value === 'string' && setChoiceUser(value)}
          value={choiceUser}
          options={options}
        />
      )}
      {!isSearch && <Magnifier onClick={() => setIsSearch(true)} />}
      {isSearch && (
        <BaseInput value={searchUser} onChange={handlerSearchUser} autoFocus isBgTransparent />
      )}
      {isSearch && <Close onClick={handlerClose} />}
    </SContainer>
  );
};

export default Navigate;
