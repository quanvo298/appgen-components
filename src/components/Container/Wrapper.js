import styled from 'styled-components';
import { Box } from 'rebass';
import {
  maxWidth,
  textAlign,
  position,
  display,
  flexBasis,
  alignItems,
  justifyContent,
} from 'styled-system';

const Wrapper = styled(Box)`
  ${maxWidth};
  ${textAlign};
  ${position};
  ${display};
  ${flexBasis};
  ${alignItems};
  ${justifyContent};
`;

Wrapper.defaultProps = {
  mx: [0],
  maxWidth: '100%',
  px: [2, 0],
};

export default Wrapper;
