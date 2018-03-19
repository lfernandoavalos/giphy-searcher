import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import { createDataLoaderMiddleware } from 'redux-dataloader';
import expect from 'expect';

import loaders from './../../src/store/loaders';

import * as actions from './../../src/Modules/Main/redux/search.actions';
import * as types from './../../src/Modules/Main/redux/search.types';

import { TRENDING, SEARCH_RESULTS } from './__mock__';

// create middleware, you can add extra arguments to data loader context
const dataLoaderMiddleware = createDataLoaderMiddleware(loaders);

const middlewares = [dataLoaderMiddleware];
const mockStore = configureMockStore(middlewares);

describe('search async actions', () => {
  beforeEach(() => {
    // eslint-disable-next-line
    global.__GIPHY_API_KEY__ = '';
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const mockResposne = data => moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        data,
      },
    });
  });

  it('creates FETCH_GIFS_SUCCESS when fetching trends is successfull', async () => {
    mockResposne(TRENDING);
    const expectedAction = {
      type: types.FETCH_GIFS_SUCCESS,
      payload: {
        results: TRENDING,
        searchTerm: undefined,
      },
    };

    const store = mockStore({ results: [] });
    await store.dispatch(actions.fetchTrending(0));
    expect(store.getActions()[4]).toEqual(expectedAction);
  });

  it('creates FETCH_GIFS_SUCCESS when searching is successfull', async () => {
    mockResposne(SEARCH_RESULTS);
    const expectedAction = {
      type: types.FETCH_GIFS_SUCCESS,
      payload: {
        results: SEARCH_RESULTS,
        searchTerm: 'Searching',
      },
    };

    const store = mockStore({ results: [] });
    await store.dispatch(actions.searchGiphy('Searching'));
    expect(store.getActions()[3]).toEqual(expectedAction);
  });

  it('creates FETCH_GIFS_SUCCESS when fetching from cache', async () => {
    const expectedAction = {
      type: types.FETCH_GIFS_SUCCESS,
      payload: {
        results: SEARCH_RESULTS,
        searchTerm: 'Searching',
        offset: 0,
      },
    };

    const store = mockStore({ results: [] });
    await store.dispatch(actions.fetchFromCache('Searching'));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
