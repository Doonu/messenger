import React, { FC, useState } from 'react';
import { SArrowDown, SContainer, SDropdown, SImgSubstitute, SName } from './mainProfile.styled';
import { IMain } from '../model/IMain';
import { convertName } from '../../../../../shared/util/user';
import { itemsDropdown } from '../lib/items';
import { useAppSelector } from '../../../../../hooks/redux';
import { selectorUser, selectorUserLoader } from '../../../../../entities/user/user.selectors';

const MainProfile: FC<IMain> = () => {
  //TODO: В сплывающем окне, смена темы и выход из аккаунта
  //TODO: Подумать над этим компонентом(Как должен выглядеть)
  //TODO: Сделать конфиг в локалсторадж для хранения темы, первый ли это заход пользователя в приложение

  const { avatar, name } = useAppSelector(selectorUser);
  const loader = useAppSelector(selectorUserLoader);

  const [arrow, setArrow] = useState(false);

  const rotateArrow = (isActive: boolean) => {
    setArrow(isActive);
  };

  return (
    <>
      {loader && <div>LOADER</div>}
      {!loader && (
        <SDropdown onOpenChange={rotateArrow} menu={{ items: itemsDropdown }} trigger={['click']}>
          <SContainer>
            {avatar && avatar[0] === '#' && name && (
              <SImgSubstitute color={avatar}>{name[0]}</SImgSubstitute>
            )}
            <SName>{convertName(name)}</SName>
            <SArrowDown $isActive={arrow} />
          </SContainer>
        </SDropdown>
      )}
    </>
  );
};

export default MainProfile;
