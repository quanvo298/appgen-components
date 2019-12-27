import React from 'react';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Wrapper from 'components/Container/Wrapper';
import BasicButton from 'components/Button/BasicButton';
import { makeListItemStyles } from 'utils/withBasicStyles';
import { usePolyglot } from 'utils/LocalProvider';

const ListItemComponent = ({
  iconComponent,
  title,
  className,
  textClasses,
  children,
  ...restProps
}) => (
  <ListItem className={className} {...restProps}>
    {iconComponent && <ListItemIcon>{iconComponent}</ListItemIcon>}
    <ListItemText classes={textClasses}>{title}</ListItemText>
    {children}
  </ListItem>
);

const ListItemCategory = props => {
  const classes = makeListItemStyles();
  return (
    <ListItemComponent
      className={classNames(classes.item, classes.itemCategory)}
      textClasses={{
        primary: classes.itemPrimary,
      }}
      {...props}
    />
  );
};

const ListItemCategoryHeader = props => {
  const classes = makeListItemStyles();
  return (
    <ListItemComponent
      className={classNames(classes.categoryHeader, classes.itemActionable)}
      textClasses={{
        primary: classes.categoryHeaderPrimary,
      }}
      {...props}
    />
  );
};

const ListItemWidget = props => {
  const classes = makeListItemStyles();
  return (
    <ListItemComponent
      className={classNames(classes.item, classes.itemActionable)}
      textClasses={{
        primary: classes.itemPrimary,
      }}
      {...props}
    />
  );
};

const ListItemCategoryHeaderDetail = ({ titleKey, labelBtns, clickBtns }) => {
  const polyglot = usePolyglot();
  const title = polyglot.t(titleKey);
  const handleClick = index => {
    if (clickBtns.length > index) {
      clickBtns[index]();
    }
  };
  return (
    <ListItemCategoryHeader title={title}>
      {labelBtns.length > 0 && (
        <Wrapper>
          {labelBtns.map((label, index) => (
            <BasicButton key={index} onClick={() => handleClick(index)}>
              {polyglot.t(label)}
            </BasicButton>
          ))}
        </Wrapper>
      )}
    </ListItemCategoryHeader>
  );
};

ListItemCategoryHeaderDetail.defaultProps = {
  labelBtns: [],
  clickBtns: [],
};

export { ListItemWidget, ListItemCategory, ListItemCategoryHeader, ListItemCategoryHeaderDetail };
