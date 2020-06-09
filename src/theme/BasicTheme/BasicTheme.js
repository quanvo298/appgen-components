import React from 'react';
import { withLayoutStyles } from '../../utils/withBasicStyles';
import Wrapper from '../../components/Container/Wrapper';
import Header from '../../components/AppBar/Header';
import NavBar from './NavBar';
import SiteNavigation from './navigation.config';

const createNavigationConfig = (navigation, polyglot) => {
  const originalSiteNavigation = SiteNavigation(polyglot);
  const siteNavigation = navigation && navigation(polyglot);
  return siteNavigation || originalSiteNavigation;
};

const BasicThemeWidget = ({ classes, navigation, children, polyglot }) => (
  <Wrapper className={classes.root}>
    <nav className={classes.drawer}>
      <NavBar navigationConfig={createNavigationConfig(navigation, polyglot)} />
    </nav>
    <Wrapper className={classes.appContent}>
      <Header />
      <main className={classes.mainContent}>{children}</main>
    </Wrapper>
  </Wrapper>
);

const BasicTheme = withLayoutStyles(BasicThemeWidget);

export default BasicTheme;
