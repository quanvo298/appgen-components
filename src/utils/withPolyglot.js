import React, { Component, forwardRef } from 'react';
import { LocaleProviderCtx } from './LocaleProvider';

const withPolyglot = WrappedComponent => {
  class Wrapped extends Component {
    render() {
      const { forwardedRef, ...restProps } = this.props;
      return (
        <LocaleProviderCtx.Consumer>
          {polyglot => <WrappedComponent ref={forwardedRef} {...restProps} polyglot={polyglot} />}
        </LocaleProviderCtx.Consumer>
      );
    }
  }
  return forwardRef((props, ref) => <Wrapped {...props} forwardedRef={ref} />);
};

export default withPolyglot;
