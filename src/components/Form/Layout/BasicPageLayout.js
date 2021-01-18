import React from 'react';
import Row from '../../Container/Row';
import Wrapper from '../../Container/Wrapper';
import ContentList from '../../ContentList/ContentList';
import { FormWidget } from '../../index';

const BasicPageLayout = ({ formConfig, contentListConfig, ...restProps }) => (
  <Wrapper>
    {formConfig && <FormWidget formConfig={formConfig} {...restProps} />}
    {contentListConfig && (
      <Row pt={3}>
        <ContentList {...contentListConfig} />
      </Row>
    )}
  </Wrapper>
);

export default BasicPageLayout;
