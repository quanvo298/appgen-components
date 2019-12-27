import React from 'react';
import Wrapper from 'components/Container/Wrapper';

const DragItem = ({ item, itemType, onDragStart, onDragEnd, ...restProps }) => {
  const handleDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target);
    event.dataTransfer.setDragImage(event.target, 20, 20);
    event.draggedItem = item;
    event.draggedItemType = itemType;
    if (onDragStart) {
      onDragStart(event);
    }
    event.stopPropagation();
  };

  const handleDragEnd = event => {
    event.stopPropagation();
    event.draggedItem = undefined;
    event.draggedItemType = undefined;
    if (onDragEnd) {
      onDragEnd(event);
    }
  };

  return <Wrapper onDragStart={handleDragStart} onDragEnd={handleDragEnd} {...restProps} />;
};

export default DragItem;
