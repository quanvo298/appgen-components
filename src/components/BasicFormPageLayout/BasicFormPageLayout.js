import React from 'react';
import Row from '../Container/Row';
import Wrapper from '../Container/Wrapper';
import BasicForm from '../BasicForm/BasicFormWidget';
import ContentList from '../ContentList/ContentList';

const BasicFormPageLayout = ({ formConfig, contentListConfig }) => (
  <Wrapper>
    {formConfig && <BasicForm {...formConfig} />}
    {contentListConfig && (
      <Row pt={3}>
        <ContentList {...contentListConfig} />
      </Row>
    )}
  </Wrapper>
);

export default BasicFormPageLayout;
