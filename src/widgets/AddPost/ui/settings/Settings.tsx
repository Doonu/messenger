import React, { FC } from 'react';
import { Dropdown } from 'antd';

import { Setting } from './settings.styled';
import { settingItemsDropdown } from '../../lib/settingsOptions';

const Settings: FC = () => {
  // TODO: Добавить хук useDevice и изменять положение
  return (
    <Dropdown placement="bottom" trigger={['hover']} menu={{ items: settingItemsDropdown }}>
      <Setting />
    </Dropdown>
  );
};

export default Settings;
