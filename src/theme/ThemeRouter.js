import React from 'react';
import withPolyglot from '../utils/withPolyglot';

const ThemeRouter = ({ page, theme, themeProps, polyglot, ...restProps }) => {
  const PageWrapper = page;
  if (theme) {
    const ThemeWrapper = theme;
    return (
      <ThemeWrapper {...themeProps} polyglot={polyglot}>
        <PageWrapper {...restProps} />
      </ThemeWrapper>
    );
  }
  return <PageWrapper {...restProps} />;
};

export default withPolyglot(ThemeRouter);
