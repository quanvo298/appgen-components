import React, { Component, forwardRef } from 'react';
import { LocalProviderCtx } from './LocalProvider';

const withPolyglot = WrappedComponent => {
  class Wrapped extends Component {
    render() {
      const { forwardedRef, ...restProps } = this.props;
      return (
        <LocalProviderCtx.Consumer>
          {polyglot => <WrappedComponent ref={forwardedRef} {...restProps} polyglot={polyglot} />}
        </LocalProviderCtx.Consumer>
      );
    }
  }
  return forwardRef((props, ref) => <Wrapped {...props} forwardedRef={ref} />);
};

export default withPolyglot;
