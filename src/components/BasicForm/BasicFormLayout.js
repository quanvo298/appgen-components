import React from 'react';
import { usePolyglot } from '../../utils/LocalProvider';
import ToolbarButton from '../Toolbar/ToolbarButton';
import ElementForm from './BasicElementForm';
import Wrapper from '../Container/Wrapper';

const ButtonsBox = ({ supportSave, supportReset, onSave, onReset, toolbarButtons }) => {
  const polyglot = usePolyglot();
  let cloneToolbarButtons = [];
  if (toolbarButtons) {
    cloneToolbarButtons = [...cloneToolbarButtons, ...toolbarButtons];
  }
  if (supportSave) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.save'),
      onClick: onSave,
    });
  }
  if (supportReset) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.reset'),
      onClick: onReset,
      color: 'default',
    });
  }
  return <ToolbarButton toolbarButtons={cloneToolbarButtons} />;
};

const BasicFormLayout = ({
  elements,
  elementsValue,
  classes,
  doSave,
  onSave,
  doReset,
  onReset,
  forwardRef,
  formToolbarButton,
  ...restProps
}) => (
  <Wrapper>
    <Wrapper>
      {elements &&
        elements.map((element, index) => (
          <ElementForm
            ref={forwardRef}
            key={index}
            {...element}
            {...restProps}
            value={elementsValue[element.name]}
          />
        ))}
    </Wrapper>
    <Wrapper className={classes.menuWrapper}>
      <ButtonsBox
        supportSave={doSave}
        supportReset={doReset}
        onSave={onSave}
        onReset={onReset}
        toolbarButtons={formToolbarButton}
      />
    </Wrapper>
  </Wrapper>
);

export default BasicFormLayout;
