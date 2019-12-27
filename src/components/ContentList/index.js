import React from 'react';
import TableEditable from 'components/TableEditor/TableEditable';
import BasicBoxWidget from 'components/BasicBoxWidget';

const ContentList = ({ title, init, gridData }) => (
  <BasicBoxWidget title={title}>
    <TableEditable disabledNew {...init} mode="view" width={1} gridData={gridData} />
  </BasicBoxWidget>
);

export default ContentList;
