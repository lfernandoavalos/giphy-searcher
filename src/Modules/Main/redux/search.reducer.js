import {
  FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING, CLEAR_SEARCH_TERM_SUCCESS,
  FETCH_GIFS_APPEND_SUCCESS,
} from './search.types';

export const initialState = {
  resetSearchTerm: false,
  searchAsyncInProgress: true,
  results: [],
  searchTerm: '',
  offset: 0,
};

export default (state = initialState, action) => {
  if (!state || Object.keys(state).length === 0) {
    return initialState;
  }

  switch (action.type) {
  case FETCH_GIFS_SUCCESS:
    return {
      ...state,
      results: action.payload.results,
      searchAsyncInProgress: false,
      resetSearchTerm: false,
      searchTerm: action.payload.searchTerm,
      offset: 25,
    };
  case FETCH_GIFS_APPEND_SUCCESS:
    return {
      ...state,
      results: [...state.results, ...action.payload.results],
      offset: state.offset + 25,
      searchAsyncInProgress: false,
    };
  case FETCH_GIFS_LOADING:
    return {
      ...state,
      searchAsyncInProgress: true,
    };
  case CLEAR_SEARCH_TERM_SUCCESS:
    return {
      ...state,
      resetSearchTerm: true,
    };
  default:
    return state;
  }
};
