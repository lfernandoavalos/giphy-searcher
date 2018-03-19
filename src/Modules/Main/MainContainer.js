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
    if (!nextProps.offset && !nextProps.searchAsyncInProgress) {
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
      const offset = 25;
      if (!this.props.searchTerm) {
        this.props.fetchTrending(this.props.offset + offset);
      } else {
        this.props.searchGiphy(this.props.searchTerm, this.props.offset + offset);
      }
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    let results = null;

    if (this.props.results.length && !this.props.error) {
      results = <Results results={this.props.results} />;
    } else if (this.props.searchAsyncInProgress) {
      results = <ContentCenter text="Loading" />;
    } else {
      results = <ContentCenter text="We couldn't find any results :(" />;
    }

    return (
      <div className={styles.mainContainer}>
        <Grid>
          <Row>
            <Col lgOffset={2} lg={6}>
              { this.props.error ?
                <div className={styles.contentCenter}>
                  <img
                    alt="Funny error gif"
                    src="https://media1.giphy.com/media/l0HlToB2cTLfq9aJW/giphy.gif"
                  />
                  <ContentCenter text="On Snap! There was an error. Our team has been alerted." />
                </div> : null
              }
              { results }
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
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  searchAsyncInProgress: state.searchReducer.searchAsyncInProgress,
  results: state.searchReducer.results,
  searchTerm: state.searchReducer.searchTerm,
  offset: state.searchReducer.offset,
  error: state.searchReducer.error,
});

const mapDispatchToProps = {
  fetchTrending,
  fetchFromCache,
  searchGiphy,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
