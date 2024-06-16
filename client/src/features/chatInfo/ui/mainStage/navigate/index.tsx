import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Segmented from 'components/ui/segment';
import { generateOptions } from '../../../lib/options';
import { IUser } from 'shared/models/IUser';
import { Close, Magnifier } from 'shared/assets/icons';
import { SContainer } from './navigate.styled';
import BaseInput from 'components/ui/inputs/baseInput';

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
        <Segmented
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
