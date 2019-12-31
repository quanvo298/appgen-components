import styled from 'styled-components';
import { Box } from 'rebass';
import { maxWidth, borderBottom } from 'styled-system';

const Container = styled(Box)`
  ${maxWidth}
  ${borderBottom}
`;

Container.defaultProps = {
  mx: 'auto',
  maxWidth: '100%',
  px: [3, 0],
  width: ['750px', '970px', '1170px'],
};

export default Container;
