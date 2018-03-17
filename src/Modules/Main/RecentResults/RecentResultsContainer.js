import React from 'react';

// React-Toolbox Components
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

import styles from './../styles.css';

const RecentResultsContainer = () => (
  <div className={styles.recentResultsContainer}>
    <List selectable ripple>
      <ListSubHeader caption="Recent Search Results" />
      <ListDivider />
      <ListItem
        caption="Funny Giphy"
        legend="Last visited 03/03/34 @ 5:34 pm"
        leftIcon="search"
      />
    </List>
  </div>
);

export default RecentResultsContainer;
