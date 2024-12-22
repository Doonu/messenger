import React, { FC } from 'react';

import { SInput } from './autosizeInput.styles';
import { IAutosizeInputProps } from '../model/autosizeInput.types';

export const AutosizeInput: FC<IAutosizeInputProps> = ({ isDrag = true, ...props }) => {
  return <SInput {...props} $isDrag={isDrag} />;
};
