import React from 'react';
import PropTypes from 'prop-types';

import Result from './Result';

const Results = ({ results }) => (
  <div>
    {results.map(result => (
      <Result key={result.id} result={result} />
    ))}
  </div>
);

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.shape({
      original: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  })).isRequired,
};

export default Results;
