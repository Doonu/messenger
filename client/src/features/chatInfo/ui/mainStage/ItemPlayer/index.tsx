import React, { FC } from 'react';
import PhotoProfile from 'shared/components/custom/profiles/photo';
import { IUser } from 'shared/models/IUser';
import { SContainer, SInfoConnected, SName, SProfileInfo } from './ItemPlayer.styled';
import { convertName } from 'shared/util/user';
import { postTime } from 'shared/util/time';

const ItemPlayer: FC<IUser> = (player) => {
  return (
    <SContainer>
      <PhotoProfile img={player.avatar} name={player.name} />
      <SProfileInfo>
        <SName>{convertName(player.name)}</SName>
        <SInfoConnected>
          {!player.statusConnected && `Был в сети ${postTime(player.timeConnected)}`}
        </SInfoConnected>
      </SProfileInfo>
    </SContainer>
  );
};

export default ItemPlayer;
