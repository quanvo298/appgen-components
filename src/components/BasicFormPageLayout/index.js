import React from 'react';
import Row from 'components/Container/Row';
import Wrapper from 'components/Container/Wrapper';
import BasicForm from '../BasicForm/BasicFormWidget';
import ContentList from '../ContentList';

const BasicFormPageLayout = ({ formConfig, contentListConfig }) => (
  <Wrapper>
    <BasicForm {...formConfig} />
    <Row pt={3}>
      <ContentList {...contentListConfig} />
    </Row>
  </Wrapper>
);

export default BasicFormPageLayout;
