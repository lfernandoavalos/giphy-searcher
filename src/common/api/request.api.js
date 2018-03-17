import axios from 'axios';

import { ltrim } from './../utils/string';

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
});

const cleanURL = url => `/${ltrim(url, '/')}`;

// HTTP VERBS

const get = (url, queryData = {}) => {
  const strQueryString = Object.keys(queryData).reduce((qStr, field) => {
    const value = encodeURIComponent(queryData[field]);
    return `${qStr}&${field}=${value}`;
  }, '');
  // eslint-disable-next-line
  const queryString = `?api_key=${__GIPHY_API_KEY__}${strQueryString}`;
  return instance.get(cleanURL(url) + queryString).then(res => res.data.data);
};

export default { get };
