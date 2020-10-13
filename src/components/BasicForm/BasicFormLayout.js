import React from 'react';
import BasicElementForm from './BasicElementForm';
import Wrapper from '../Container/Wrapper';
import Row from '../Container/Row';

const BasicFormLayout = props => {
  const {
    FormComponentLayout,
    elements,
    elementsValue,
    classes,
    doSave,
    onSave,
    doReset,
    onReset,
    formToolbarButton,
    addFormElementRef,
    ...restProps
  } = props;

  return (
    <Wrapper>
      {FormComponentLayout ? (
        <FormComponentLayout
          elements={elements}
          elementsValue={elementsValue}
          forwardRef={addFormElementRef}
          {...restProps}
        />
      ) : (
        elements &&
        elements.map((element, index) => (
          <Row mx={2} my={3} key={index}>
            <BasicElementForm
              ref={addFormElementRef}
              {...element}
              {...restProps}
              value={elementsValue[element.name]}
            />
          </Row>
        ))
      )}
    </Wrapper>
  );
};

export default BasicFormLayout;
