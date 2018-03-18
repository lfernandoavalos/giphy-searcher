import request from './request.api';

export default {
  fetchTrending: () => request.get('/trending'),
  search: (qStr: String, offset: Number) => request.get('/search', {
    // eslint-disable-next-line
    q: qStr,
    offset,
  }),
};
