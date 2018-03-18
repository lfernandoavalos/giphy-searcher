import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { CacheStorage } from './../../common/utils/storage';

import { fetchTrending, fetchFromCache } from './redux/search.actions';

// Sidebar for recent searches + quick links
import SidebarMenu from './Sidebar/SidebarMenu';
import Results from './Results/Results';

import styles from './styles.css';

class MainContainer extends Component {
  state = {
    cachedResults: [],
  };

  componentDidMount() {
    this.props.fetchTrending();
  }

  componentWillReceiveProps() {
    const cachedResults = [];
    CacheStorage.toArray().forEach((cachedResult) => {
      cachedResults.push(cachedResult.description);
    });
    this.setState({ cachedResults });
  }


  onClickRecentSearchResults = (caption: String) => {
    this.props.fetchFromCache(caption);
  }

  onClickTrending = () => this.props.fetchTrending();

  render() {
    return (
      <div className={styles.mainContainer}>
        <Grid>
          <Row>
            <Col lgOffset={2} lg={6}>
              { !this.props.searchAsyncInProgress ?
                <Results
                  results={this.props.results}
                /> : 'Loading'}
            </Col>
            <Col lg={4}>
              <div className={styles.sidebar}>
                <SidebarMenu
                  title="Quick Links"
                  items={[
                    {
                      caption: 'Trending',
                      legend: 'Powered by Giphy',
                      leftIcon: 'trending_up',
                    },
                  ]}
                  onClick={this.onClickTrending}
                />
                { this.state.cachedResults.length ?
                  <SidebarMenu
                    title="Recent Search Results"
                    items={this.state.cachedResults}
                    onClick={this.onClickRecentSearchResults}
                  /> : null}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

MainContainer.propTypes = {
  fetchTrending: PropTypes.func.isRequired,
  searchAsyncInProgress: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    }),
    images: PropTypes.shape({
      original: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  })).isRequired,
  fetchFromCache: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchAsyncInProgress: state.searchReducer.searchAsyncInProgress,
  results: state.searchReducer.results,
  searchTerm: state.searchReducer.searchTerm,
});

const mapDispatchToProps = {
  fetchTrending,
  fetchFromCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
