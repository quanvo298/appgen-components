import { Text as RText } from 'rebass';
import styled, { css } from 'styled-components';
import { opacity, border, display } from 'styled-system';

const getMaxHeight = ({ theme, lineHeight, lineClamp }) => {
  const themeLineHeight = theme.lineHeights[lineHeight];
  if (themeLineHeight) {
    return `calc(${themeLineHeight}*${lineClamp})`;
  }

  if (typeof lineHeight === 'number') {
    return `calc(${lineHeight}em*${lineClamp})`;
  }

  return `calc(${lineHeight}*${lineClamp})`;
};

const ellipsisStyle = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
  max-height: ${getMaxHeight};
`;

const Text = styled(RText)`
  ${opacity};
  cursor: ${props => props.cursor && props.cursor};
  ${border};
  ${display};
  text-decoration: none;
  ${props => props.lineClamp && ellipsisStyle}
`;

Text.defaultProps = {
  fontSize: 14,
  fontWeight: 1,
  lineHeight: 2,
  color: 'black',
};

export default Text;
