import React, { Fragment, useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { AppBar } from '..';
import { withTabStyles } from '../../utils/withBasicStyles';

const Show = ({ selectedTab, name, children }) => selectedTab === name && children;

const TabHeader = ({ tabs, selectedIndexTab, onChange }) => (
  <Tabs value={selectedIndexTab} onChange={onChange}>
    {tabs.map(({ tabTitle }, index) => (
      <Tab label={tabTitle} key={index} />
    ))}
  </Tabs>
);

const TabContainer = ({ onChange, children, classes, selectedTab: selectedTabName }) => {
  const tabPositions = [];
  const tabConfig = React.Children.toArray(children).map(child => {
    const { tabName, tabTitle } = child.props;
    tabPositions.push(tabName);
    return { tabName, tabTitle };
  });

  const [selectedTab, setSelectedTab] = useState(selectedTabName || tabPositions[0]);

  const handleSelecteTab = (event, tabIndex) => {
    const tabName = tabPositions[tabIndex];
    if (onChange) {
      onChange(tabName);
    }
    setSelectedTab(tabName);
  };

  return (
    <Fragment>
      <AppBar>
        <TabHeader
          selectedIndexTab={tabPositions.indexOf(selectedTab)}
          onChange={handleSelecteTab}
          tabs={tabConfig}
        />
      </AppBar>
      {React.Children.toArray(children).map((child, index) => {
        const { tabName } = child.props;
        return (
          <Show selectedTab={selectedTab} name={tabName} key={index}>
            <main className={classes.mainContent}>{child}</main>
          </Show>
        );
      })}
    </Fragment>
  );
};

export default withTabStyles(TabContainer);
