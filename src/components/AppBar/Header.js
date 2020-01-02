import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from './AppBar';
import withPolyglot from '../../utils/withPolyglot';

const Header = ({polyglot}) => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        {polyglot.t('app.title')}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withPolyglot(Header);
