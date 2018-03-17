import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle } from 'react-toolbox/lib/card';


import styles from './../styles.css';

const getPreviewUrl = url => url.replace('media2', 'i');

const Result = ({ result }) => (
  <div className={styles.restul}>
    <Card>
      <CardTitle
        avatar={result.user.avatar_url}
        title={result.user.username}
        subtitle={`Twitter: ${result.user.twitter}`}
      />
      <CardMedia
        aspectRatio="wide"
        image={getPreviewUrl(result.images.original.url)}
      />
      <CardTitle
        title={result.title}
      />
    </Card>
  </div>
);


Result.propTypes = {
  result: PropTypes.shape({
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
  }).isRequired,
};

export default Result;
