import React from 'react';
import FieldForm from '../FieldForm';
import Wrapper from '../../Container/Wrapper';
import Row from '../../Container/Row';

const BasicLayout = ({ fields, formValues = {}, fieldErrors = {}, onFieldChange }) =>
  Object.keys(fields).map(fieldName => {
    const field = fields[fieldName];

    return (
      <Row mx={2} my={3} key={fieldName}>
        <FieldForm
          {...field}
          name={fieldName}
          value={{ value: formValues[fieldName] }}
          error={fieldErrors[fieldName]}
          onFieldChange={onFieldChange}
        />
      </Row>
    );
  });

const FormLayout = props => {
  const { layout: CustomLayout } = props;

  const Layout = CustomLayout || BasicLayout;
  return (
    <Wrapper>
      <Layout {...props} />
    </Wrapper>
  );
};

export default FormLayout;
