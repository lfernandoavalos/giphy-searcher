import request from './request.api';

export default {
  fetchTrending: (offset: Number) => request.get('/trending', {
    offset,
  }),
  search: (qStr: String, offset: Number) => request.get('/search', {
    // eslint-disable-next-line
    q: qStr,
    offset,
  }),
};
