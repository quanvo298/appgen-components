import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, CardActions, Divider } from '@material-ui/core';
import { withBasicFormStyles } from '../../utils/withBasicStyles';

const BasicBoxWidget = ({
  showTitle = true,
  title,
  headerActions,
  cardActions,
  classes,
  children,
  className,
}) => (
  <Card className={clsx(classes.card, className)}>
    {showTitle && <CardHeader title={title} action={headerActions} className={classes.header} />}
    {showTitle && <Divider />}
    <CardContent className={classes.content}>{children}</CardContent>
    {cardActions && (
      <Fragment>
        <Divider />
        <CardActions className={classes.actions}>{cardActions}</CardActions>
      </Fragment>
    )}
  </Card>
);

export default withBasicFormStyles(BasicBoxWidget);
