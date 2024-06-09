import React, { KeyboardEvent, FC, useEffect, useState } from 'react';
import { IEditable } from './model/IEditable';
import { SBaseInput, SEdit, SEditable, SName } from './editable.styled';

const Editable: FC<IEditable> = ({ value: defaultValue = '', onChange }) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isEditable, setIsEditable] = useState(false);

  const handlerEdit = () => {
    setIsEditable(true);
  };

  const handlerBlur = () => {
    setIsEditable(false);
    onChange(value);
  };

  const handlerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditable(false);
      onChange(value);
    }

    if (event.key === 'Escape') {
      event.stopPropagation();
      setIsEditable(false);
      setValue(defaultValue);
      onChange(defaultValue);
    }
  };

  useEffect(() => {}, [isEditable]);

  return (
    <SEditable>
      {!isEditable && (
        <>
          <SName>{value}</SName>
          <SEdit onClick={handlerEdit} />
        </>
      )}
      {isEditable && (
        <SBaseInput
          onChange={(e) => setValue(e.target.value)}
          onBlur={handlerBlur}
          onKeyDown={handlerKeyDown}
          isBgTransparent
          value={value}
          autoFocus
        />
      )}
    </SEditable>
  );
};

export default Editable;
