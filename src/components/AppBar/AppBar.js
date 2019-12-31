import React from 'react';
import AppBar from '@material-ui/core/AppBar';

const AppBarWrapper = props => {
  return <AppBar component="div" color="primary" position="static" elevation={0} {...props} />;
};

export default AppBarWrapper;
