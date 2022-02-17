import React from 'react';
import Row from '../../Container/Row';
import Wrapper from '../../Container/Wrapper';
import ContentList from '../../ContentList/ContentList';
import { useForm } from '../hocs/FormProvider';
import FormWidget from '../FormWidget';

const BasicPageLayout = ({
  formName,
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

  const supportFormWidget = Boolean(formName) || Boolean(formConfig);
  return (
    <Wrapper>
      {supportFormWidget && <FormWidget formName={formName} {...restProps} />}
      {contentListConfig && (
        <Row pt={supportFormWidget ? 3 : 0}>
          <ContentList {...contentListConfig} />
        </Row>
      )}
    </Wrapper>
  );
};

export default BasicPageLayout;
