import request from './request.api';

export default {
  fetchTrending: () => request.get('/trending'),
};
