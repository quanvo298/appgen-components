import React from 'react';
import Wrapper from './Wrapper';

const Row = props => (
  <Wrapper flexWrap="nowrap" display="flex" alignItems="center" {...props} flexDirection="row" />
);

export default Row;
