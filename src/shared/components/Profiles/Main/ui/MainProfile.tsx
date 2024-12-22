import React, { FC, useState } from 'react';
import { convertName } from '@shared/util';
import { useAppSelector } from '@shared/hooks';
import { selectorProfileLoader, selectorProfile } from '@entities/profile';
import { Dropdown } from 'antd';
import { PhotoProfile } from '@shared/components';

import SkeletonMainProfile from './MainProfileSkeleton';
import { itemsDropdown } from '../lib/items';
import { IMain } from '../model/main.types';
import { SArrowDown, SContainer, SName, SProfileContainer } from './mainProfile.styles';

export const MainProfile: FC<IMain> = () => {
  // TODO: В сплывающем окне, смена темы и выход из аккаунта
  // TODO: Подумать над этим компонентом(Как должен выглядеть)
  // TODO: Сделать конфиг в локалсторадж для хранения темы,
  //  первый ли это заход пользователя в приложение

  const { avatar, name } = useAppSelector(selectorProfile);
  const loader = useAppSelector(selectorProfileLoader);

  const [arrow, setArrow] = useState(false);

  const rotateArrow = (isActive: boolean) => {
    setArrow(isActive);
  };

  if (loader) {
    return <SkeletonMainProfile />;
  }

  return (
    <SProfileContainer>
      <Dropdown onOpenChange={rotateArrow} menu={{ items: itemsDropdown }} trigger={['click']}>
        <SContainer>
          <PhotoProfile img={avatar} name={name} />
          <SName>{convertName(name)}</SName>
          <SArrowDown $isActive={arrow} />
        </SContainer>
      </Dropdown>
    </SProfileContainer>
  );
};
