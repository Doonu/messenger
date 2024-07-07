import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks';
import { IAllFriendRequests } from '@shared/models';
import { getAllFriendRequests } from '@shared/api';
import { ApplicationFriend } from '@widgets/items';

import { SBlockContainer, SListFriendRequest, STitle } from './application.styled';

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
          <ApplicationFriend filterRequest={handlerDeleteById} request={request} key={request.id} />
        ))}
      </SListFriendRequest>
    </SBlockContainer>
  );
};

export default ApplicationsFriends;
