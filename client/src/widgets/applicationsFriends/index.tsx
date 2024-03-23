import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { getAllFriendRequests } from '../../shared/api';
import { IAllFriendRequests } from '../../shared/models/IFriendRequest';
import { SBlockContainer, SListFriendRequest, STitle } from './applicationsFriends.styled';
import ItemApplicationsFriends from './ItemApplicationsFriends';

const ApplicationsFriends = () => {
  const dispatch = useAppDispatch();

  const [friendsRequests, setFriendRequests] = useState<IAllFriendRequests[]>([]);

  const handlerDeleteById = (id: number) => {
    setFriendRequests((oldList) => oldList.filter((req) => req.id !== id));
  };

  useEffect(() => {
    dispatch(getAllFriendRequests())
      .unwrap()
      .then((data) => setFriendRequests(data))
      .catch(() => {});
  }, []);

  if (!friendsRequests?.length) return null;

  return (
    <SBlockContainer>
      <STitle>
        Заявки в друзья
        <span>{` - ${friendsRequests?.length}`}</span>
      </STitle>
      <SListFriendRequest>
        {friendsRequests?.map((request) => (
          <ItemApplicationsFriends
            filterRequest={handlerDeleteById}
            request={request}
            key={request.id}
          />
        ))}
      </SListFriendRequest>
    </SBlockContainer>
  );
};

export default ApplicationsFriends;
