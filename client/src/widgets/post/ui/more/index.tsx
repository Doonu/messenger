import React, { FC } from 'react';
import { Dropdown } from 'antd';
import { moreItemsDropdown } from '../../lib/moreOptions';
import { SMore } from './more.styled';
import { IPost } from '../../model/shared';

const More: FC<IPost> = ({ post }) => {
  return (
    <Dropdown placement="bottom" trigger={['click']} menu={{ items: moreItemsDropdown(post) }}>
      <SMore size={20} />
    </Dropdown>
  );
};

export default More;
