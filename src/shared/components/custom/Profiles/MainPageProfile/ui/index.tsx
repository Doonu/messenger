import React, { FC } from 'react';
import { PhotoProfile, BaseButton } from '@shared/components';
import { convertName, postTime } from '@shared/util';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';

import { IMainPageProfile } from '../model/IMainPageProfile';
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

export const MainPageProfile: FC<IMainPageProfile> = ({
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
