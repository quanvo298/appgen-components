import { getConfigModule } from '../utils';

export const getProps = ({ path, themeName }) => {
  const { themes } = getConfigModule();
  const theme = themes && themes[themeName];
  let themeProps = {};
  if (theme) {
    const { defaultProps } = theme;
    if (theme[path]) {
      themeProps = theme[path].props;
    } else {
      themeProps = defaultProps;
    }
  }
  return themeProps;
};
