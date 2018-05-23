import React from 'react';
import { shallow } from 'enzyme';
import Filter from './Filter';

test('Filter с одним дочерним элементом', () => {
  const tree = shallow(
    <Filter isOpen>
      <div id="testing">test</div>
    </Filter>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
});

test('Filter с двумя дочерними элементами', () => {
  const tree = shallow(
    <Filter isOpen>
      <div id="testing">test</div>
      <div id="testing-2">test</div>
    </Filter>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
  expect(tree.contains(<div id="testing-2">test</div>)).toBeTruthy();
});

test('Filter открывается по клику на кнопку', () => {
  const tree = shallow(
    <Filter>
      <div id="testing">test</div>
    </Filter>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeFalsy();

  tree.find("[data-test='button']").simulate('click');

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
});

test('Filter скрывется по клику на кнопку', () => {
  const tree = shallow(
    <Filter isOpen>
      <div id="testing">test</div>
    </Filter>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();

  tree.find("[data-test='button']").simulate('click');

  expect(tree.contains(<div id="testing">test</div>)).toBeFalsy();
});
