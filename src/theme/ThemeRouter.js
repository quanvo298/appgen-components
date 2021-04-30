import React from 'react';
import withPolyglot from '../hocs/withPolyglot';
import { getProps } from '../helper/ThemeModuleHelper';

const ThemeRouter = ({ page: PageWrapper, theme: ThemeWrapper, polyglot, ...restProps }) => {
  if (ThemeWrapper) {
    const themeProps = getProps({ path: restProps.path, themeName: ThemeWrapper.displayName });
    return (
      <ThemeWrapper {...themeProps} polyglot={polyglot}>
        <PageWrapper {...restProps} />
      </ThemeWrapper>
    );
  }
  return <PageWrapper {...restProps} />;
};

export default withPolyglot(ThemeRouter);
