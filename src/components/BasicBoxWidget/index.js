import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from 'components/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Wrapper from 'components/Container/Wrapper';
import { withBasicFormStyles } from 'utils/withBasicStyles';

const BasicBoxWidget = ({ title, buttonsBox, classes, children }) => (
  <Paper className={classes.paper}>
    <AppBar color="default">
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          {buttonsBox}
        </Grid>
      </Toolbar>
    </AppBar>
    <Wrapper className={classes.contentWrapper}>{children}</Wrapper>
  </Paper>
);

export default withBasicFormStyles(BasicBoxWidget);
