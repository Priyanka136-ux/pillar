

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Home from '../Home';
import {jest} from '@jest/globals';

 jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
