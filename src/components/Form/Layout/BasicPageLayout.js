import React from 'react';
import Row from '../../Container/Row';
import Wrapper from '../../Container/Wrapper';
import ContentList from '../../ContentList/ContentList';
import { FormWidget, useFormCtx } from '../../index';

const BasicPageLayout = ({
  formConfig,
  contentListConfig: propContentListConfig,
  ...restProps
}) => {
  const { getFormIntegrations } = useFormCtx();

  const { reduceContentListConfig } = getFormIntegrations();
  const contentListConfig =
    reduceContentListConfig != null
      ? reduceContentListConfig(propContentListConfig)
      : propContentListConfig;

  return (
    <Wrapper>
      {formConfig && <FormWidget formConfig={formConfig} {...restProps} />}
      {contentListConfig && (
        <Row pt={3}>
          <ContentList {...contentListConfig} />
        </Row>
      )}
    </Wrapper>
  );
};

export default BasicPageLayout;
