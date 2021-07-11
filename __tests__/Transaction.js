
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Transaction from '../Transaction';
import {jest} from '@jest/globals';

 jest.useFakeTimers();

test('Transaction renders correctly', () => {
  const tree = renderer.create(<Transaction />).toJSON();
  expect(tree).toMatchSnapshot();
});
