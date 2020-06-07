import React from 'react';
import withPolyglot from '../utils/withPolyglot';

const ThemeRouter = ({
  page: PageWrapper,
  theme: ThemeWrapper,
  themeProps,
  polyglot,
  ...restProps
}) => {
  if (ThemeWrapper) {
    return (
      <ThemeWrapper {...themeProps} polyglot={polyglot}>
        <PageWrapper {...restProps} />
      </ThemeWrapper>
    );
  }
  return <PageWrapper {...restProps} />;
};

export default withPolyglot(ThemeRouter);
