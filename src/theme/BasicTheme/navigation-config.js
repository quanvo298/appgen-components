import React from 'react';
import HomeIcon from '@material-ui/icons/Home';

const HomeIconComponent = <HomeIcon />;

const SiteNavigation = polyglot => ({
  home: {
    title: polyglot.t('nav.title'),
    href: '/',
    icon: HomeIconComponent,
  },
});

export default SiteNavigation;
