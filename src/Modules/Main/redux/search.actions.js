import { load } from 'redux-dataloader';

import { HTTP_REQUEST } from './../../../redux/generic.types';

import GiphyAPI from './../../../common/api/giphy.api';

import {
  FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING,
  CLEAR_SEARCH_TERM_SUCCESS, FETCH_TRENDING_SUCCESS
} from './search.types';

const fetchSearchSuccess = results => ({
  type: FETCH_GIFS_SUCCESS,
  payload: {
    results,
  },
});

const fetchTrendingSuccess = results => ({
  type: FETCH_TRENDING_SUCCESS,
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

const fetchTrending = () =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.fetchTrending(),
    success: (results, context) => {
      context.dispatch(clearSearchTerm());
      return fetchTrendingSuccess(results);
    },
    loading: () => loading(),
  });

const searchGiphy = (searchTerm: String, offset: Number = 0) =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.search(searchTerm, offset),
    success: results => fetchSearchSuccess(results),
    loading: () => loading()
  });

// const getFromCatch = () => console.log('Fetching from cache');

export {
  searchGiphy,
  fetchTrending,
};
