import React from 'react';
import BasicButton from '../Button/BasicButton';

const ToolbarButton = ({ toolbarButtons, buttons = [] }) =>
  (toolbarButtons || buttons).map((button, index) => (
    <BasicButton key={index} {...button}>
      {button.label}
    </BasicButton>
  ));

export default ToolbarButton;
