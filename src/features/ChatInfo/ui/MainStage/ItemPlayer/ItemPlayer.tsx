import React, { FC } from 'react';
import { PhotoProfile } from '@shared/components';
import { convertName, postTime } from '@shared/util';
import { IUser } from '@entities/friends';

import { SContainer, SInfoConnected, SName, SProfileInfo } from './ItemPlayer.styles';

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
