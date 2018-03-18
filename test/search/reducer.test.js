import expect from 'expect';

import reducer, { initialState } from './../../src/Modules/Main/redux/search.reducer';
import * as types from './../../src/Modules/Main/redux/search.types';

import { TRENDING } from './__mock__';


describe('search reducer', () => {
  it('should return the initial state', () => {
    const action = {
      type: types.FETCH_GIFS_LOADING,
    };
    expect(reducer({}, action)).toEqual(initialState);
    expect(reducer(false, action)).toEqual(initialState);
    expect(reducer(null, action)).toEqual(initialState);
  });

  it('should handle FETCH_GIFS_SUCCESS', () => {
    const action = {
      type: types.FETCH_GIFS_SUCCESS,
      payload: {
        results: TRENDING,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      results: TRENDING,
      offset: 26,
      searchAsyncInProgress: false,
      searchTerm: undefined,
    });
  });

  it('should handle FETCH_GIFS_APPEND_SUCCESS', () => {
    const state = reducer(initialState, {
      type: types.FETCH_GIFS_SUCCESS,
      payload: {
        results: TRENDING,
        searchTerm: 'Searching',
      },
    });

    const action = {
      type: types.FETCH_GIFS_APPEND_SUCCESS,
      payload: {
        results: [...TRENDING],
      },
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      results: [...TRENDING, ...TRENDING],
      offset: 51,
      searchAsyncInProgress: false,
      searchTerm: 'Searching',
    });
  });
});
