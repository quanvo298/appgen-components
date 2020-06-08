import React from 'react';
import { usePolyglot } from '../../utils/LocaleProvider';
import ConfirmDialog from './ConfirmDialog';

const DeleteConfirmDialog = React.forwardRef((props, ref) => (
  <ConfirmDialog
    ref={ref}
    content={usePolyglot().t('message.confirm.delete')}
    onConfirm={props.onConfirm}
    openDialog={props.openDialog}
  />
));

export default DeleteConfirmDialog;
