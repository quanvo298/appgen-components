import React from 'react';
import BasicElementForm from './BasicElementForm';
import Wrapper from '../Container/Wrapper';
import Row from '../Container/Row';

const BasicFormLayout = React.forwardRef((props, ref) => {
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
    ...restProps
  } = props;
  return (
    <Wrapper>
      {FormComponentLayout ? (
        <FormComponentLayout
          elements={elements}
          elementsValue={elementsValue}
          forwardRef={ref}
          {...restProps}
        />
      ) : (
        elements &&
        elements.map((element, index) => (
          <Row mx={2} my={3} key={index}>
            <BasicElementForm
              ref={ref}
              {...element}
              {...restProps}
              value={elementsValue[element.name]}
            />
          </Row>
        ))
      )}
    </Wrapper>
  );
});

export default BasicFormLayout;
