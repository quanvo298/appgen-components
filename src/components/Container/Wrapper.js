import styled from 'styled-components';
import { Box } from 'rebass';
import { maxWidth, textAlign, position } from 'styled-system';

const Wrapper = styled(Box)`
  ${maxWidth};
  ${textAlign};
  ${position};
`;

Wrapper.defaultProps = {
  mx: [0],
  maxWidth: '100%',
  px: [2, 0],
};

export default Wrapper;
