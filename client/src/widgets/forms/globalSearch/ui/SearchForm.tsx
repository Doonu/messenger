import React from 'react';
import { ISearch } from '../model/ISearch';
import { ContainerSearch, SContainerForm } from './searchForm.styled';
import { Formik } from 'formik';
import { Form } from 'antd';
import BaseInput from 'components/ui/inputs/baseInput';
import BaseButton from 'components/ui/buttons/baseButton';

const GlobalSearch = () => {
  //TODO: при нажатии на инпут загружается превью с вазможным результатом поиска с дебаунсом
  //TODO: сделать select (загрузка контента с помощью поиска в инпуте, выбор контента)

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

export default GlobalSearch;
