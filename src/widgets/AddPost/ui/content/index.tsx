import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { useAppSelector } from '@shared/hooks';
import { selectorProfile } from '@entities/profile';
import { PhotoProfile } from '@shared/components';
import { IPost } from '@entities/dialogs';
import { AutosizeInput } from '@shared/ui';

import { SContainer } from './content.styled';

interface IContent {
  isActive: boolean;
}

const Content: FC<IContent> = ({ isActive }) => {
  const { values, setFieldValue } = useFormikContext<IPost>();
  const { name, avatar } = useAppSelector(selectorProfile);

  return (
    <SContainer $position={isActive}>
      <PhotoProfile img={avatar} name={name} />
      <AutosizeInput
        isDrag
        minRows={2}
        value={values.content}
        $position={isActive}
        onChange={(e) => setFieldValue('content', e.target.value)}
        onFocus={() => setFieldValue('isActive', true)}
        placeholder="Что у вас нового?"
        autoComplete="off"
        draggable="false"
      />
    </SContainer>
  );
};

export default Content;
