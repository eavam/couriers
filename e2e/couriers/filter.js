import { ReactSelector } from 'testcafe-react-selectors'; // first import testcafe selectors

fixture`Getting Started`.page`http://localhost:3000/couriers`; // declare the fixture

test('My first test', async t => {
  const selectCountry = ReactSelector('CustomSelect').withProps(
    'data-test',
    'country',
  );

  await t
    .typeText(selectCountry.find('input'), 'Китай')
    .pressKey('enter')
    .expect(selectCountry)
    .eql('Thank you, John Smith!');
});
