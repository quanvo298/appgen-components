import React from 'react';
import Button from '@material-ui/core/Button';
import { withButtonStyles } from '../../hocs/withBasicStyles';

const BasicButton = ({ classes, ...restProps }) => (
  <Button variant="outlined" color="primary" className={classes.addButton} {...restProps} />
);

export default withButtonStyles(BasicButton);
