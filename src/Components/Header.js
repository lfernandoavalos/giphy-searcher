import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-flexbox-grid';

// React-Toolbox components
import AppBar from 'react-toolbox/lib/app_bar';
import Input from 'react-toolbox/lib/input';

// Redux actions
// import { fetchTrending } from './../Modules/Main/redux/search.actions';

// Override React-toolbox themes
import appBarTheme from './themes/appBar.css';

// Component styles
import styles from './styles.css';

const SearchBar = ({ onChange, searchTerm }) => (
  <div className={styles.searchBarContainer}>
    <Input
      icon="search"
      className={styles.appSearchInput}
      hint="Search for GIF"
      value={searchTerm}
      onChange={onChange}
    />
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

class Header extends Component {
  state = {
    searchTerm: '',
  };

  onChangeSearchTerm = searchTerm => this.setState({ searchTerm });

  render() {
    return (
      <div className={styles.header}>
        <Grid>
          <Row>
            <Col lg={12}>
              <AppBar
                title={
                  <SearchBar
                    searchTerm={this.state.searchTerm}
                    onChange={this.onChangeSearchTerm}
                  />
                }
                theme={appBarTheme}
                flat
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(Header);
