import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { fetchTrending } from './redux/search.actions';

import RecentResultsContainer from './RecentResults/RecentResultsContainer';
import Results from './Results/Results';

import styles from './styles.css';

class MainContainer extends Component {
  componentDidMount() {
    this.props.fetchTrending();
  }

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
              <RecentResultsContainer />
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
};

const mapStateToProps = state => ({
  searchAsyncInProgress: state.searchReducer.searchAsyncInProgress,
  results: state.searchReducer.results,
});

const mapDispatchToProps = {
  fetchTrending,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
