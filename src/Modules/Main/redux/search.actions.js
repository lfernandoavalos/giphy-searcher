import { load } from 'redux-dataloader';

import { HTTP_REQUEST } from './../../../redux/generic.types';

import GiphyAPI from './../../../common/api/giphy.api';

import { CacheStorage } from './../../../common/utils/storage';

import {
  FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING,
  CLEAR_SEARCH_TERM_SUCCESS, FETCH_GIFS_APPEND_SUCCESS,
  FETCH_GIFS_FAILURE,
} from './search.types';

const fetchSearchSuccess = (results, searchTerm, offset) => ({
  type: FETCH_GIFS_SUCCESS,
  payload: {
    results,
    searchTerm,
    offset,
  },
});

const clearSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM_SUCCESS,
});

const loading = () => ({
  type: FETCH_GIFS_LOADING,
});

const fetchSearchAppendSuccess = (results, offset) => ({
  type: FETCH_GIFS_APPEND_SUCCESS,
  payload: {
    results,
    offset,
  },
});

const fetchSearchFailure = () => ({
  type: FETCH_GIFS_FAILURE,
});

const fetchTrending = (offset: Number = 0) =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.fetchTrending(offset),
    success: (results, context) => {
      context.dispatch(clearSearchTerm());

      if (offset) {
        return fetchSearchAppendSuccess(results, offset);
      }

      return fetchSearchSuccess(results);
    },
    loading: () => loading(),
    error: () => fetchSearchFailure(),
  });

const searchGiphy = (searchTerm: String, offset: Number = 0) =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.search(searchTerm, offset),
    success: (results) => {
      if (!offset) {
        CacheStorage.setItem(searchTerm, undefined);
      }

      if (!CacheStorage.hasItem(searchTerm)) {
        CacheStorage.setItem(searchTerm, {
          description: {
            caption: searchTerm,
            legend: `Seen: ${new Date()}`,
            leftIcon: 'search',
          },
          offset: 0,
          results,
        });
      } else if (offset) {
        const cachedResults = CacheStorage.getItem(searchTerm);
        CacheStorage.setItem(searchTerm, {
          ...cachedResults,
          results: [...cachedResults.results, ...results],
          offset,
        });
      }

      if (offset) {
        return fetchSearchAppendSuccess(results, offset);
      }

      return fetchSearchSuccess(results, searchTerm);
    },
    loading: () => loading(),
    error: () => fetchSearchFailure(),
  });

const fetchFromCache = (searchTerm) => {
  const { results, offset } = CacheStorage.getItem(searchTerm);
  return fetchSearchSuccess(results, searchTerm, offset);
};

export {
  searchGiphy,
  fetchTrending,
  fetchFromCache,
};
