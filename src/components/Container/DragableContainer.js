import React from 'react';
import Wrapper from '../Container/Wrapper';
import { withDragableStyles } from '../../utils/withBasicStyles';

const DragableContainer = ({ classes, onDrop, supportDrop, children, notPadding }) => {
  const onDragLeave = event => {
    event.target.style.border = 'none';
    event.target.style.background = 'none';
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragOver = event => {
    if (supportDrop && supportDrop(event)) {
      event.target.style.border = 'purple groove';
      event.target.style.background = 'azure';
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = event => {
    event.target.style.border = 'none';
    event.target.style.background = 'none';
    onDrop(event);
  };

  return (
    <Wrapper
      className={notPadding ? classes.flatDragable : classes.dragable}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop && handleDrop}
    >
      {children}
    </Wrapper>
  );
};

export default withDragableStyles(DragableContainer);
