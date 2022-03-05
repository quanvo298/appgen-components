import React, { Fragment } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { AppBar } from '..';
import { withTabStyles } from '../../hocs/withBasicStyles';

const Show = ({ selectedTab, name, children }) => selectedTab === name && children;

const TabHeader = ({ tabs, selectedIndexTab, onChange }) => (
  <Tabs value={selectedIndexTab} onChange={onChange}>
    {tabs.map(({ tabTitle }, index) => (
      <Tab label={tabTitle} key={index} />
    ))}
  </Tabs>
);

const TabContainer = ({ onChange, children, classes, selectedTab }) => {
  const tabPositions = [];
  const tabConfig = React.Children.toArray(children).map(({ props }) => {
    const { tabName, tabTitle } = props;
    tabPositions.push(tabName);
    return { tabName, tabTitle };
  });

  const selectedTabName = selectedTab || tabPositions[0];

  const handleSelectedTab = (event, tabIndex) => {
    const tabName = tabPositions[tabIndex];
    if (onChange) {
      onChange(tabName);
    }
  };

  return (
    <Fragment>
      <AppBar>
        <TabHeader
          selectedIndexTab={tabPositions.indexOf(selectedTabName)}
          onChange={handleSelectedTab}
          tabs={tabConfig}
        />
      </AppBar>
      {React.Children.toArray(children).map((child, index) => {
        const { tabName } = child.props;
        return (
          <Show selectedTab={selectedTabName} name={tabName} key={index}>
            <main className={classes.mainContent}>{child}</main>
          </Show>
        );
      })}
    </Fragment>
  );
};

export default withTabStyles(TabContainer);
