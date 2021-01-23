import React from 'react';
import Row from '../../Container/Row';
import Wrapper from '../../Container/Wrapper';
import ContentList from '../../ContentList/ContentList';
import { useForm } from '../hocs/FormProvider';
import FormWidget from '../FormWidget';

const BasicPageLayout = ({
  formConfig,
  contentListConfig: propContentListConfig,
  ...restProps
}) => {
  const { getFormIntegrations } = useForm();

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
