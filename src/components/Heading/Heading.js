import React from 'react';
import Text from '../Text/Text';

const TextForHeading = (name, headingProps, defaultProps) => {
  function HeadingText(props) {
    const textProps = { ...props, ...headingProps };

    return <Text {...textProps} />;
  }

  HeadingText.displayName = name;
  HeadingText.propTypes = Text.propTypes;
  HeadingText.defaultProps = {
    ...Text.defaultProps,
    ...defaultProps,
    lineHeight: 'normal',
    as: name.toLowerCase(),
    margin: 0,
  };

  return HeadingText;
};

const NAMES = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
  H7: 'H7',
};
const PROPS = {
  [NAMES.H1]: { fontSize: 6, fontWeight: 3 },
  [NAMES.H2]: { fontSize: 5, fontWeight: 2 },
  [NAMES.H3]: { fontSize: 4, fontWeight: 2 },
  [NAMES.H4]: { fontSize: 3, fontWeight: 2 },
  [NAMES.H5]: { fontSize: 2, fontWeight: 1 },
  [NAMES.H6]: { fontSize: 1, fontWeight: 1 },
  [NAMES.H7]: { fontSize: 0, fontWeight: 1 },
};
const DEFAULT_PROPS = {
  [NAMES.H6]: { opacity: '0.5' },
};

export const H1 = TextForHeading(NAMES.H1, PROPS.H1);
export const H2 = TextForHeading(NAMES.H2, PROPS.H2);
export const H3 = TextForHeading(NAMES.H3, PROPS.H3);
export const H4 = TextForHeading(NAMES.H4, PROPS.H4);
export const H5 = TextForHeading(NAMES.H5, PROPS.H5);
export const H6 = TextForHeading(NAMES.H6, PROPS.H6, DEFAULT_PROPS.H6);
export const H7 = TextForHeading(NAMES.H7, PROPS.H7);
