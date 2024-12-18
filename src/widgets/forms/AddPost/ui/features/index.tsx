import React from 'react';
import { useFormikContext } from 'formik';
import { Select } from '@shared/components';
import { IPost } from '@shared/models';

import { SContainer } from './features.styled';
import { displayOptions } from '../../lib/displayOptions';

const Features = () => {
  const { values, setFieldValue } = useFormikContext<IPost>();

  const handlerChange = (value: string) => {
    setFieldValue('view', value);
  };

  return (
    <SContainer>
      <Select
        value={values.view}
        onChange={handlerChange}
        width="120px"
        defaultValue="slider"
        options={displayOptions}
      />
    </SContainer>
  );
};

export default Features;
