import React from 'react';
import PubSub from './PubSub';
import { isNotBlank } from './StringUtils';

const withSubscription = subcriptionName => WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: undefined,
      };
    }

    componentDidMount() {
      if (isNotBlank(subcriptionName)) {
        PubSub.on(this.handleChange, subcriptionName);
        return;
      }
      PubSub.on(this.handleChange);
    }

    componentWillUnmount() {
      if (isNotBlank(subcriptionName)) {
        PubSub.removeEventListener(this.handleChange, subcriptionName);
        return;
      }
      PubSub.removeEventListener(this.handleChange);
    }

    handleChange(data) {
      this.setState({
        data,
      });
    }

    render() {
      return <WrappedComponent subcriptionItem={this.state.data} {...this.props} />;
    }
  };
};

export default withSubscription;
