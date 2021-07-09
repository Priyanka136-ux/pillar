
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';
import {jest} from '@jest/globals';

 jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
