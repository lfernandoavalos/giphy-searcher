import { load } from 'redux-dataloader';

import { HTTP_REQUEST } from './../../../redux/generic.types';

import GiphyAPI from './../../../common/api/giphy.api';

import { CacheStorage } from './../../../common/utils/storage';

import {
  FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING,
  CLEAR_SEARCH_TERM_SUCCESS,
} from './search.types';

const fetchSearchSuccess = (results, searchTerm) => ({
  type: FETCH_GIFS_SUCCESS,
  payload: {
    results,
    searchTerm,
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
      return fetchSearchSuccess(results);
    },
    loading: () => loading(),
  });

const searchGiphy = (searchTerm: String, offset: Number = 0) =>
  load({
    type: HTTP_REQUEST,
    fetch: () => GiphyAPI.search(searchTerm, offset),
    success: (results) => {
      if (!offset) {
        CacheStorage.setItem(searchTerm, undefined);
      }

      if (!CacheStorage.hasItem[searchTerm]) {
        CacheStorage.setItem(searchTerm, {
          description: {
            caption: searchTerm,
            legend: `Seen: ${new Date()}`,
            leftIcon: 'search',
          },
          results,
        });
      } else if (offset) {
        const cachedResults = CacheStorage.getItem(searchTerm);
        cachedResults.results = [cachedResults.results, ...results];
      }

      return fetchSearchSuccess(results, searchTerm);
    },
    loading: () => loading(),
  });

const fetchFromCache = (searchTerm) => {
  const { results } = CacheStorage.getItem(searchTerm);
  return fetchSearchSuccess(results, searchTerm);
};

export {
  searchGiphy,
  fetchTrending,
  fetchFromCache,
};
