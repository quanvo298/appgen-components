import React from 'react';
import { usePolyglot } from '../../utils/LocaleProvider';
import ConfirmDialog from './ConfirmDialog';

const DeleteConfirmDialog = ({ onConfirm, id }) => {
  const polyglot = usePolyglot();
  return (
    <ConfirmDialog id={id} content={polyglot.t('message.confirm.delete')} onConfirm={onConfirm} />
  );
};

export default DeleteConfirmDialog;
