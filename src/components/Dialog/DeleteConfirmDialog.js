import React from 'react';
import { usePolyglot } from '../../utils/LocaleProvider';
import ConfirmDialog from './ConfirmDialog';

const DeleteConfirmDialog = React.forwardRef(props => {
  const { onConfirm, id } = props;
  const polyglot = usePolyglot();
  return (
    <ConfirmDialog id={id} content={polyglot.t('message.confirm.delete')} onConfirm={onConfirm} />
  );
});

export default DeleteConfirmDialog;
