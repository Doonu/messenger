import React from 'react';
import { SContainer } from './features.styled';
import { displayOptions } from '../../lib/displayOptions';
import { useFormikContext } from 'formik';
import { IPost } from '../../model/IPost';
import { BaseSelect } from 'components/ui/select';

const Features = () => {
  const { values, setFieldValue } = useFormikContext<IPost>();

  const handlerChange = (value: string) => {
    setFieldValue('view', value);
  };

  return (
    <SContainer>
      <BaseSelect
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
