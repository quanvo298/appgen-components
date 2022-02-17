import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { Wrapper } from 'appgen-components';

const SourceBox = ({ item, type, children, ...restProps }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { data: item, type },
    canDrag: true,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
      cursor: 'move',
    }),
    [isDragging]
  );

  return (
    <Wrapper ref={drag} style={containerStyle} {...restProps}>
      {children}
    </Wrapper>
  );
};

export default SourceBox;
