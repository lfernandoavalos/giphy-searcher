import React from 'react';
import PropTypes from 'prop-types';

// Component styles
import styles from './styles.css';

const AppContainer = ({ children }) => <div id="layout" className={styles.appContainer}>{ children }</div>;

AppContainer.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.array.isRequired,
};

export default AppContainer;
