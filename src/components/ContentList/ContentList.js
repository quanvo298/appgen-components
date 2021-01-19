import React from 'react';
import TableEditable from '../Table/TableEditable';
import FormBox from '../Form/Layout/FormBox';

const ContentList = ({ title, init, gridData }) => {
  return (
    <FormBox title={title}>
      <TableEditable
        disabledDeleted
        disabledNew
        {...init}
        mode="view"
        width={1}
        gridData={gridData}
      />
    </FormBox>
  );
};

export default ContentList;
