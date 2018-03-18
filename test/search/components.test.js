import React from 'react';
import renderer from 'react-test-renderer';

import { TRENDING, SEARCH_RESULTS } from './__mock__';

import Results from './../../src/Modules/Main/Results/Results';
import Result from './../../src/Modules/Main/Results/Result';

it('renders gif results correclty', () => {
  const tree = renderer
    .create(<Results results={TRENDING} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders gif without user result correclty', () => {
  const tree = renderer
    .create(<Result {...SEARCH_RESULTS[0]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders gif with user result correclty', () => {
  const tree = renderer
    .create(<Result {...TRENDING[0]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
