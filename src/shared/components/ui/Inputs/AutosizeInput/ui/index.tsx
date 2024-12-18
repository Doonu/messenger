import React, { FC } from 'react';

import { SInput } from './autosizeInput.styled';
import { IAutosizeInputProps } from '../model/IAutosizeInput';

export const AutosizeInput: FC<IAutosizeInputProps> = ({ isDrag = true, ...props }) => {
  return <SInput {...props} $isDrag={isDrag} />;
};
