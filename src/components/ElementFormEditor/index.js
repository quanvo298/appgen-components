import React from 'react';
import TableEditable from 'components/TableEditor/TableEditable';
import BasicEditor from 'components/ElementFormEditor/BasicEditor';
import { TABLE_MODE } from 'utils/constant';

const GridComponent = ({ component, name, value, onInputChange, forwardRef, ...restProps }) => (
  <TableEditable
    {...component}
    mode={TABLE_MODE.Edit}
    gridData={value}
    componentName={name}
    disabledDeleted={component.disabledDeleted}
    disabledNew={component.disabledNew}
    onChange={onInputChange && onInputChange(name)}
    ref={forwardRef}
    {...restProps}
  />
);

const ElementTagBaseOnComponent = React.forwardRef((props, ref) => {
  switch (props.component.type) {
    case 'grid':
      return <GridComponent {...props} forwardRef={ref} />;
    default:
      return <BasicEditor {...props} />;
  }
});

const ElementFormEditor = ({ forwardedRef, ...restProps }) =>
  restProps.component ? (
    <ElementTagBaseOnComponent ref={forwardedRef} {...restProps} />
  ) : (
    <BasicEditor {...restProps} />
  );

export default ElementFormEditor;
