import React, { useEffect, useState } from 'react';
import {
  SBlockContainer,
  SListFriendRequest,
  STitle,
} from '../../../../../widgets/items/applicationsFriend/applicationFriend.styled';
import { useAppDispatch } from '../../../../../hooks/redux';
import { IAllFriendRequests } from '../../../../../shared/models/IFriendRequest';
import { getAllFriendRequests } from '../../../../../shared/api';
import ApplicationFriend from '../../../../../widgets/items/applicationsFriend';

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
