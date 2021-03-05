import styled from 'styled-components';
import { Box } from 'rebass';
import {
  minHeight,
  maxWidth,
  textAlign,
  position,
  display,
  flexBasis,
  alignItems,
  justifyContent,
  flexWrap,
} from 'styled-system';

const Wrapper = styled(Box)`
  ${maxWidth};
  ${textAlign};
  ${position};
  ${display};
  ${flexBasis};
  ${alignItems};
  ${justifyContent};
  ${flexWrap};
  ${minHeight};
`;

Wrapper.defaultProps = {
  mx: [0],
  px: [2, 0],
};

export default Wrapper;
