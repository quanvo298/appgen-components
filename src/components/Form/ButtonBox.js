import React from 'react';
import { usePolyglot } from '../../utils';
import ToolbarButton from '../Toolbar/ToolbarButton';

const ButtonBox = ({
  supportNew,
  supportDelete,
  handleAdd,
  handleDelete,
  supportSave,
  supportReset,
  onSave,
  onReset,
  toolbarButtons = [],
}) => {
  const polyglot = usePolyglot();
  const cloneToolbarButtons = [
    ...toolbarButtons,
    ...(supportNew
      ? [
          {
            label: polyglot.t('btn.new'),
            onClick: handleAdd,
          },
        ]
      : []),
    ...(supportDelete
      ? [
          {
            label: polyglot.t('btn.delete'),
            onClick: handleDelete,
            color: 'secondary',
          },
        ]
      : []),
    ...(supportSave
      ? [
          {
            label: polyglot.t('btn.save'),
            onClick: onSave,
            variant: 'contained',
          },
        ]
      : []),
    ...(supportReset
      ? [
          {
            label: polyglot.t('btn.reset'),
            onClick: onReset,
            color: 'default',
          },
        ]
      : []),
  ];

  return <ToolbarButton buttons={cloneToolbarButtons} />;
};

export default ButtonBox;
