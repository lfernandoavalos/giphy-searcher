import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle } from 'react-toolbox/lib/card';


import styles from './../styles.css';

const getPreviewUrl = url => url.replace('media2', 'i');

const Result = ({ title, user, images }) => (
  <div className={styles.result}>
    <Card raised={false}>
      <CardTitle
        avatar={user.avatar_url}
        title={user.username}
        subtitle={`Twitter: ${user.twitter}`}
      />
      <CardMedia
        aspectRatio="wide"
        image={getPreviewUrl(images.original.url)}
      />
      <CardTitle
        title={title}
      />
    </Card>
  </div>
);

Result.defaultProps = {
  user: {
    username: 'Anonymous',
    avatar_url: '#',
    twitter: 'anonymous',
  },
};

Result.propTypes = {
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
  }).isRequired,
};

export default Result;
