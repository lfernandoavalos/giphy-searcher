import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import GiphyAPI from './../../common/api/giphy.api';

import RecentResultsContainer from './RecentResults/RecentResultsContainer';
import Results from './Results/Results';

import styles from './styles.css';

class MainContainer extends Component {
  state = {
    results: [],
  }

  componentDidMount() {
    GiphyAPI.fetchTrending().then(results => this.setState({ results }));
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <Grid>
          <Row>
            <Col lgOffset={2} lg={6}>
              <Results
                results={this.state.results}
              />
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

export default MainContainer;
