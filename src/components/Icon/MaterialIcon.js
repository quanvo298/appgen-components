import React from 'react';
import * as icons from '@material-ui/icons';
import { defaultFunc } from '../../utils/props';

const getIcon = iconName => iconName && icons[iconName];

const MaterialIcon = ({ iconName, onIconClick = defaultFunc, color = 'primary', styleProps }) => {
  const IconComponent = getIcon(iconName);
  return IconComponent && <IconComponent color={color} onClick={onIconClick} {...styleProps} />;
};

export default MaterialIcon;
