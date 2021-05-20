import React, { useMemo } from 'react';
import { Wrapper } from 'appgen-components';
import { withDraggableStyles } from 'appgen-components/src/hocs/withBasicStyles';
import { useDrop } from 'react-dnd';

const TargetBox = ({
  classes,
  onDrop,
  children,
  accept,
  item: targetItem,
  checkCanDrop,
  ...restProps
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop(item) {
      onDrop(item, targetItem);
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(), // && (checkCanDrop ? checkCanDrop(monitor.getItem(), targetItem) : true),
    }),
  });

  const containerStyle = useMemo(
    () => ({
      border: isOver ? '1px dashed gray' : 'none',
      opacity: isOver ? 1 : 0.7,
      backgroundColor: canDrop ? 'lightblue' : '#eaeff1',
      // padding: '2px',
      height: '90%',
    }),
    [isOver, canDrop]
  );
  return (
    <Wrapper
      ref={drop}
      className={classes.draggable}
      style={containerStyle}
      padding="2px"
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

export default withDraggableStyles(TargetBox);
