import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { CacheStorage } from './../../common/utils/storage';

import { fetchTrending, fetchFromCache, searchGiphy } from './redux/search.actions';

// Sidebar for recent searches + quick links
import SidebarMenu from './Sidebar/SidebarMenu';
import Results from './Results/Results';

import styles from './styles.css';

const ContentCenter = ({ text }) => (<p className={styles.contentCenter}>{text}</p>);

ContentCenter.propTypes = {
  text: PropTypes.string.isRequired,
};

class MainContainer extends Component {
  state = {
    cachedResults: [],
  };

  componentDidMount() {
    this.props.fetchTrending();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    // Page reset
    if (nextProps.offset === 25) {
      window.scrollTo(0, 0);
    }
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

  /**
   * Handle user reaches bottom
   * Specail thanks to
   * https://stackoverflow.com/a/45586395/6036717
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */
  isBottom = element => element.getBoundingClientRect().bottom <= window.innerHeight;

  handleScroll = () => {
    const wrappedElement = document.getElementById('layout');
    if (this.isBottom(wrappedElement)
      && !this.props.searchAsyncInProgress) {
      if (!this.props.searchTerm) {
        this.props.fetchTrending(this.props.offset);
      } else {
        this.props.searchGiphy(this.props.searchTerm, this.props.offset);
      }
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <Grid>
          <Row>
            <Col lgOffset={2} lg={6}>
              { this.props.results.length ?
                <Results
                  results={this.props.results}
                /> : <ContentCenter text="Loading" />}
              { this.props.searchAsyncInProgress && this.props.results.length ?
                <ContentCenter text="Loading Next Page :)" /> : null}
            </Col>
            <Col className={styles.hiddenMd} lg={4}>
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

MainContainer.defaultProps = {
  searchTerm: '',
};

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
  offset: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  searchGiphy: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchAsyncInProgress: state.searchReducer.searchAsyncInProgress,
  results: state.searchReducer.results,
  searchTerm: state.searchReducer.searchTerm,
  offset: state.searchReducer.offset,
});

const mapDispatchToProps = {
  fetchTrending,
  fetchFromCache,
  searchGiphy,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
