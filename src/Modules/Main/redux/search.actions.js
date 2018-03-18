import { load } from 'redux-dataloader';

import { HTTP_REQUEST } from './../../../redux/generic.types';

import GiphyAPI from './../../../common/api/giphy.api';

import { FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING, CLEAR_SEARCH_TERM_SUCCESS } from './search.types';

const fetchSuccess = results => ({
  type: FETCH_GIFS_SUCCESS,
  payload: {
    results,
  },
});

const clearSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM_SUCCESS,
});

const loading = () => ({
  type: FETCH_GIFS_LOADING,
});

export const fetchTrending = () =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.fetchTrending(),
    success: (results, context) => {
      context.dispatch(clearSearchTerm());
      return fetchSuccess(results);
    },
    loading: () => loading(),
  });

// const search = (searchTerm: String, start: Number, offset: Number) =>
// console.log('Fetching From Search');

// const getFromCatch = () => console.log('Fetching from cache');

export default fetchTrending;
