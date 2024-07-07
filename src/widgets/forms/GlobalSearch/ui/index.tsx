import React from 'react';
import { Formik } from 'formik';
import { Form } from 'antd';
import { BaseInput, BaseButton } from '@shared/components';

import { ContainerSearch, SContainerForm } from './searchForm.styled';
import { ISearch } from '../model/ISearch';

export const GlobalSearch = () => {
  // TODO: при нажатии на инпут загружается превью с вазможным результатом поиска с дебаунсом
  // TODO: сделать Index (загрузка контента с помощью поиска в инпуте, выбор контента)

  const initialValue: ISearch = {
    search: '',
  };

  const formSubmit = (values: ISearch) => {
    console.log(`Поиск по строке - ${values.search}`);
  };

  return (
    <SContainerForm>
      <Formik initialValues={initialValue} onSubmit={formSubmit}>
        {({ handleSubmit, values, setFieldValue }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <ContainerSearch>
              <BaseInput
                onChange={(e) => setFieldValue('search', e.target.value)}
                value={values.search}
                minWidth="400px"
                placeholder="Поиск..."
                border="none"
                height="40px"
              />
              <BaseButton disabled={!values.search} htmlType="submit">
                Поиск
              </BaseButton>
            </ContainerSearch>
          </Form>
        )}
      </Formik>
    </SContainerForm>
  );
};
