import React, { FC } from 'react';
import { PhotoProfile } from '@shared/components';
import { IUser } from '@shared/models';
import { convertName, postTime } from '@shared/util';

import { SContainer, SInfoConnected, SName, SProfileInfo } from './ItemPlayer.styled';

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
