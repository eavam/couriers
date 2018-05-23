import { getCountries } from './filters';

test('getCountries', () => {
  const state = {
    courierFilters: {
      countriesList: [1, 2, 3],
    },
  };
  expect(getCountries(state)).toEqual([1, 2, 3]);
});
