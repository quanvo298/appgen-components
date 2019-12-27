import React from 'react';
import BasicButton from 'components/Button/BasicButton';

const ToolbarButton = ({ toolbarButtons }) =>
  toolbarButtons &&
  toolbarButtons.map((toolbarButton, index) => (
    <BasicButton key={index} {...toolbarButton}>
      {toolbarButton.label}
    </BasicButton>
  ));

export default ToolbarButton;
