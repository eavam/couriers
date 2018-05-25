import React from 'react';
import { shallow } from 'enzyme';
import FilterBar from '../FilterBar';

test('Filter с одним дочерним элементом', () => {
  const tree = shallow(
    <FilterBar isOpen>
      <div id="testing">test</div>
    </FilterBar>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
});

test('Filter с двумя дочерними элементами', () => {
  const tree = shallow(
    <FilterBar isOpen>
      <div id="testing">test</div>
      <div id="testing-2">test</div>
    </FilterBar>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
  expect(tree.contains(<div id="testing-2">test</div>)).toBeTruthy();
});

test('Filter открывается по клику на кнопку', () => {
  const tree = shallow(
    <FilterBar>
      <div id="testing">test</div>
    </FilterBar>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeFalsy();

  tree.find("[data-test='button']").simulate('click');

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();
});

test('Filter скрывется по клику на кнопку', () => {
  const tree = shallow(
    <FilterBar isOpen>
      <div id="testing">test</div>
    </FilterBar>,
  );

  expect(tree.contains(<div id="testing">test</div>)).toBeTruthy();

  tree.find("[data-test='button']").simulate('click');

  expect(tree.contains(<div id="testing">test</div>)).toBeFalsy();
});
