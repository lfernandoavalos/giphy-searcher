import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';

// React-Toolbox components
import AppBar from 'react-toolbox/lib/app_bar';
import Input from 'react-toolbox/lib/input';

// Override React-toolbox themes
import appBarTheme from './themes/appBar.css';

// Component styles
import styles from './styles.css';

const SearchBar = () => (
  <div className={styles.searchBarContainer}>
    <Input
      icon="search"
      className={styles.appSearchInput}
      hint="Search for GIF"
    />
  </div>
);

const Header = () => (
  <div className={styles.header}>
    <Grid>
      <Row>
        <Col lg={12}>
          <AppBar title={<SearchBar />} theme={appBarTheme} flat />
        </Col>
      </Row>
    </Grid>
  </div>
);

const AppContainer = ({ children }) => <div className={styles.appContainer}>{ children }</div>;

AppContainer.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.array.isRequired,
};

export {
  Header,
  AppContainer,
};
