import React from 'react';
import FieldForm from '../FieldForm';
import Wrapper from '../../Container/Wrapper';
import Row from '../../Container/Row';

const BasicLayout = ({ fields, formValues = {}, fieldErrors = {}, onFieldChange }) =>
  Object.keys(fields).map(fieldName => {
    const field = fields[fieldName];
    const value = { value: formValues != null ? formValues[fieldName] : null };
    return (
      <Row mx={2} my={3} key={fieldName}>
        <FieldForm
          {...field}
          name={fieldName}
          value={value}
          error={fieldErrors[fieldName]}
          onFieldChange={onFieldChange}
        />
      </Row>
    );
  });

const FormLayout = props => {
  const { layout: CustomLayout, fields, formValues } = props;

  const Layout = CustomLayout || BasicLayout;
  return (
    <Wrapper>
      {fields != null && (
        <Layout {...props} formValues={formValues != null ? formValues : undefined} />
      )}
    </Wrapper>
  );
};

export default FormLayout;
