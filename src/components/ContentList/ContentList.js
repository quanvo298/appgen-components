import React from 'react';
import TableEditable from '../Table/TableEditable';
import BasicBoxWidget from '../BasicBoxWidget/BasicBoxWidget';

const ContentList = ({ title, init, gridData }) => (
  <BasicBoxWidget title={title}>
    <TableEditable
      disabledDeleted
      disabledNew
      {...init}
      mode="view"
      width={1}
      gridData={{ value: gridData }}
    />
  </BasicBoxWidget>
);

export default ContentList;
