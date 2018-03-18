import { FETCH_GIFS_SUCCESS, FETCH_GIFS_LOADING } from './search.types';

export const initialState = {
  searchTerm: '',
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
    };
  case FETCH_GIFS_LOADING:
    return {
      ...state,
      searchAsyncInProgress: true,
    };
  default:
    return state;
  }
};
