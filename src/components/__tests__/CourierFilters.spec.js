import React from 'react';
import { shallow } from 'enzyme';
import { Checkbox } from 'antd';

import { Filters } from '../CourierFilters';

describe('CoutierFilters', () => {
  test('содержит компонент для выбора страны', () => {
    const tree = shallow(<Filters />);
    const select = tree.find("[data-test='country']");
    expect(select).toHaveLength(1);
  });

  test("компонент для выбора страны c label 'Страна'", () => {
    const tree = shallow(<Filters />);
    const select = tree.find("[data-test='country']");
    expect(select.prop('label')).toBe('Страна');
  });

  test('компонент для выбора страны c data', () => {
    const data = [
      { id: 'rus', text: 'Россия' },
      { id: 'chn', text: 'Китай' },
      { id: 'nor', text: 'Норвегия' },
    ];
    const tree = shallow(<Filters countries={data} />);
    const select = tree.find("[data-test='country']");

    expect(select.prop('data')).toEqual(data);
  });

  test('содержит компонент для выбора офиса', () => {
    const tree = shallow(<Filters />);
    const select = tree.find("[data-test='office']");
    expect(select).toHaveLength(1);
  });

  test("компонент для выбора офиса c label 'Офис'", () => {
    const tree = shallow(<Filters />);
    const select = tree.find("[data-test='office']");
    expect(select.prop('label')).toBe('Офис');
  });

  test('компонент для выбора офиса c data', () => {
    const data = [
      { id: 'nov', text: 'Новосибирск' },
      { id: 'kem', text: 'Кемерово' },
      { id: 'mos', text: 'Москва' },
    ];
    const tree = shallow(<Filters offices={data} />);
    const select = tree.find("[data-test='office']");

    expect(select.prop('data')).toEqual(data);
  });

  test("содержит компонент Checkbox c label 'Только активные'", () => {
    const tree = shallow(<Filters />);
    const checkbox = tree.find(Checkbox);

    expect(checkbox).toHaveLength(1);
    expect(checkbox.contains('Только активные')).toBeTruthy();
  });
});
