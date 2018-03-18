import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-flexbox-grid';

// React-Toolbox components
import AppBar from 'react-toolbox/lib/app_bar';
import Input from 'react-toolbox/lib/input';

// Redux actions
import { searchGiphy, fetchTrending } from './../Modules/Main/redux/search.actions';
import { KEY_PRESS_EVENTS } from './../common/utils/constants';

// Override React-toolbox themes
import appBarTheme from './themes/appBar.css';

// Component styles
import styles from './styles.css';

const SearchBar = ({ onChange, searchTerm, onKeyPress }) => (
  <div className={styles.searchBarContainer}>
    <Input
      icon="search"
      className={styles.appSearchInput}
      hint="Search for GIF"
      value={searchTerm}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

class Header extends Component {
  state = {
    searchTerm: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetSearchTerm) {
      this.setState({
        searchTerm: '',
      });
    }
  }

  onChangeSearchTerm = searchTerm => this.setState({ searchTerm });

  onKeyPress = (event) => {
    if (event.charCode === KEY_PRESS_EVENTS.KEY_CODE_ENTER) {
      if (!this.state.searchTerm) {
        this.props.fetchTrending();
      } else {
        this.props.searchGiphy(this.state.searchTerm);
      }
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <Grid>
          <Row>
            <Col lg={12}>
              <AppBar
                title={
                  <SearchBar
                    onKeyPress={this.onKeyPress}
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

Header.defaultProps = {
  resetSearchTerm: false,
};

Header.propTypes = {
  resetSearchTerm: PropTypes.bool,
  searchGiphy: PropTypes.func.isRequired,
  fetchTrending: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  resetSearchTerm: state.searchReducer.resetSearchTerm,
});

const mapDispatchToProps = {
  searchGiphy,
  fetchTrending,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
