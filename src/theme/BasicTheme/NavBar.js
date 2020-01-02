import React, { Component, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { navigate } from '@reach/router';
import { Divider } from '@material-ui/core';
import {
  ListItemCategory,
  ListItemCategoryHeader,
  ListItemWidget,
} from '../../components/ListItemWidget/ListItemWidget';
import { withNavigatorStyles } from '../../utils/withBasicStyles';
import { isNotEmpty } from '../../utils/CollectionUtils';

const ListItemCategoryWrapper = ({ title, icon, href }) => {
  const hanldeClick = event => {
    event.stopPropagation();
    event.preventDefault();
    if (href) navigate(href);
  };
  return <ListItemCategory iconComponent={icon} onClick={hanldeClick} title={title} />;
};

const ListItemCategoryHeaderWrapper = ({
  title,
  icon,
  href,
  supportExpand,
  onExpand,
  expandStatus,
}) => {
  const hanldeClick = event => {
    event.stopPropagation();
    event.preventDefault();
    if (href) navigate(href);
  };

  return (
    <ListItemCategoryHeader iconComponent={icon} onClick={hanldeClick} title={title}>
      {supportExpand && expandStatus && <ExpandLess onClick={onExpand} />}
      {supportExpand && !expandStatus && <ExpandMore onClick={onExpand} />}
    </ListItemCategoryHeader>
  );
};

const ListItemWrapper = ({ title, icon, href }) => {
  const hanldeClick = event => {
    event.stopPropagation();
    event.preventDefault();
    if (href) navigate(href);
  };
  return <ListItemWidget iconComponent={icon} onClick={hanldeClick} title={title} />;
};

class NavBar extends Component {
  state = {
    expandStatus: {},
  };

  handleExpandMoreAndLess = (categoryId, event) => {
    event.stopPropagation();
    event.preventDefault();
    const { expandStatus } = this.state;
    expandStatus[categoryId] = !expandStatus[categoryId];
    this.setState({ expandStatus });
  };

  doRenderSubCategories = (category, index) => {
    const { subCategories, supportExpand } = category;
    const expandStatus = this.state.expandStatus[index];
    return isNotEmpty(subCategories) && ((supportExpand && expandStatus) || !supportExpand);
  };

  render() {
    const { classes, navigationConfig = {} } = this.props;
    const { expandStatus } = this.state;
    return (
      <Drawer variant="permanent" className={classes.paper}>
        <List disablePadding className={classes.paper}>
          {navigationConfig.home && <ListItemCategoryWrapper {...navigationConfig.home} />}
          {navigationConfig.categories &&
            navigationConfig.categories.map((category, index) => (
              <Fragment key={index}>
                <ListItemCategoryHeaderWrapper
                  title={category.title}
                  href={category.href}
                  icon={category.icon}
                  supportExpand={category.supportExpand}
                  expandStatus={expandStatus[index]}
                  onExpand={event => this.handleExpandMoreAndLess(index, event)}
                />
                {this.doRenderSubCategories(category, index) &&
                  category.subCategories.map((subCatergory, subIndex) => (
                    <ListItemWrapper key={subIndex} {...subCatergory} />
                  ))}

                <Divider className={classes.divider} />
              </Fragment>
            ))}
        </List>
      </Drawer>
    );
  }
}

export default withNavigatorStyles(NavBar);
