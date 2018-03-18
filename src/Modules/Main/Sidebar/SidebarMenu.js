import React from 'react';
import PropTypes from 'prop-types';

// React-Toolbox Components
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

import styles from './../styles.css';

const SidebarMenu = ({ title, items, onClick }) => (
  <div className={styles.recentResultsContainer}>
    <List selectable ripple>
      <ListSubHeader caption={title} />
      <ListDivider />
      {items.map(item => (
        <ListItem
          key={`sidebar-menu-${item.caption}`}
          caption={item.caption}
          legend={item.legend}
          leftIcon={item.leftIcon}
          onClick={() => onClick(item.caption)}
        />
      ))}
    </List>
  </div>
);

SidebarMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string.isRequired,
    legend: PropTypes.string.isRequired,
    leftIcon: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidebarMenu;
