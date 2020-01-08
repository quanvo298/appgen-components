import React from 'react';
import { withLayoutStyles } from '../../utils/withBasicStyles';
import Wrapper from '../../components/Container/Wrapper';
import Header from '../../components/AppBar/Header';
import NavBar from './NavBar';
import SiteNavigation from './navigation.config';
import { usePolyglot } from '../../utils/LocalProvider';

const createNavigationConfig = navigation => {
  const polyglot = usePolyglot();
  const originalSiteNavigation = SiteNavigation(polyglot);
  const siteNavigation = navigation && navigation(polyglot);
  return siteNavigation || originalSiteNavigation;
};

const BasicThemeWidget = ({ classes, navigation, children }) => (
  <Wrapper className={classes.root}>
    <nav className={classes.drawer}>
      <NavBar navigationConfig={createNavigationConfig(navigation)} />
    </nav>
    <Wrapper className={classes.appContent}>
      <Header />
      <Wrapper className={classes.appPageContent}>{children}</Wrapper>
    </Wrapper>
  </Wrapper>
);

const BasicTheme = withLayoutStyles(BasicThemeWidget);

export default BasicTheme;
