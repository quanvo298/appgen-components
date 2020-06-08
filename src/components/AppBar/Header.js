import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from './AppBar';
import { usePolyglot } from '../../utils/LocaleProvider';

const Header = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        {usePolyglot().t('app.title')}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
