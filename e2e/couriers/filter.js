import { ReactSelector } from 'testcafe-react-selectors'; // first import testcafe selectors

fixture`Страница "Курьеры"`.page`http://localhost:3000/couriers`; // declare the fixture

test('Автокомплит страны', async t => {
  const selectCountry = ReactSelector('Select').withProps(
    'data-test',
    'country',
  );
  const selectOption = ReactSelector('MenuItem').withProps('children', 'Китай');

  const selectResult = selectCountry.find(
    '.ant-select-selection-selected-value',
  );

  await t
    .click(selectCountry)
    .typeText(selectCountry, 'Китай', { speed: 0.1 })
    .click(selectOption)
    .expect(selectResult.exists)
    .ok()
    .expect(selectResult.innerText)
    .eql('Китай')
    .expect(selectResult.count)
    .eql(1);
});

test('Селект страны', async t => {
  const selectCountry = ReactSelector('Select').withProps(
    'data-test',
    'country',
  );
  const selectOption = ReactSelector('MenuItem').withProps('children', 'Китай');

  const selectResult = selectCountry.find(
    '.ant-select-selection-selected-value',
  );

  await t
    .click(selectCountry)
    .click(selectOption)
    .expect(selectResult.exists)
    .ok()
    .expect(selectResult.innerText)
    .eql('Китай')
    .expect(selectResult.count)
    .eql(1);
});
