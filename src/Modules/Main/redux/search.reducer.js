import { FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING, CLEAR_SEARCH_TERM_SUCCESS } from './search.types';

export const initialState = {
  resetSearchTerm: false,
  searchAsyncInProgress: true,
  results: [],
};

export default (state = initialState, action) => {
  if (!state || Object.keys(state).length === 0) {
    return initialState;
  }

  switch (action.type) {
  case FETCH_GIFS_SUCCESS:
    return {
      ...state,
      searchAsyncInProgress: false,
      results: action.payload.results,
      resetSearchTerm: false,
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
