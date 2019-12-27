import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import { justifyContent, display } from 'styled-system';

const ColumnStyle = styled(Box)`
  ${justifyContent}
  ${display}
`;

const Column = props => <ColumnStyle px={3} flex="1 1 auto" {...props} />;

export default Column;
