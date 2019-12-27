import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { usePolyglot } from 'utils/LocalProvider';
import AppBar from './AppBar';

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
