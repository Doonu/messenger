import React, { FC } from 'react';

import {
  SActions,
  SBlockContainer,
  SHeader,
  SInfo,
  SMessage,
  SName,
  SNavigate,
  SRow,
} from './mainPageProfile.styled';
import PhotoProfile from 'shared/components/custom/profiles/photo';
import { convertName } from 'shared/util/user';
import { useAppSelector } from 'hooks/redux';
import { selectorProfile } from 'entities/profile/profile.selectors';
import { IMainPageProfile } from '../model/IMainPageProfile';
import BaseButton from 'shared/components/ui/buttons/baseButton';
import { postTime } from 'shared/util/time';

const MainPageProfile: FC<IMainPageProfile> = ({
  user,
  friendRequest,
  handlerCheckFriend,
  statusFriendRequest,
  handlerFriendRequestAccepted,
  handlerDeleteFriend,
  handlerCancelFriendRequest,
  handlerCancelAddFriend,
  handlerWriteMessage,
}) => {
  const profile = useAppSelector(selectorProfile);
  const isMyProfile = profile.id === user.id;

  return (
    <SBlockContainer>
      <SHeader />
      <PhotoProfile
        fontSize={50}
        isAbsolute
        left={20}
        top={100}
        size={100}
        img={user.avatar}
        name={user.name}
      />
      <SInfo>
        <SRow>
          <SNavigate>
            <SName>{convertName(user.name)}</SName>
            <div>
              {user.statusConnected ? 'Онлайн' : `Был в сети ${postTime(user.timeConnected)}`}
            </div>
          </SNavigate>
          <SActions>
            {isMyProfile && <BaseButton variant="secondary">Редактировать профиль</BaseButton>}
            {!isMyProfile && !handlerCheckFriend() && statusFriendRequest.status === false && (
              <BaseButton variant="secondary" onClick={friendRequest}>
                Добавить в друзья
              </BaseButton>
            )}
            {!isMyProfile && !handlerCheckFriend() && statusFriendRequest.status === 'sender' && (
              <BaseButton onClick={handlerCancelFriendRequest} variant="secondary">
                Отменить преложение дружбы
              </BaseButton>
            )}
            {!isMyProfile &&
              !handlerCheckFriend() &&
              statusFriendRequest &&
              statusFriendRequest.status === 'recipient' && (
                <>
                  <BaseButton onClick={handlerFriendRequestAccepted} variant="secondary">
                    Принять предложение
                  </BaseButton>
                  <BaseButton onClick={handlerCancelAddFriend} variant="secondary">
                    Отменить предложение
                  </BaseButton>
                </>
              )}
            {!isMyProfile && handlerCheckFriend() && statusFriendRequest.status === false && (
              <BaseButton onClick={handlerDeleteFriend} variant="secondary">
                Удалить из друзей
              </BaseButton>
            )}
            {!isMyProfile && <SMessage onClick={handlerWriteMessage} />}
          </SActions>
        </SRow>
        <SRow>Подробнее</SRow>
      </SInfo>
    </SBlockContainer>
  );
};

export default MainPageProfile;
