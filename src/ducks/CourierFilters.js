import { createAction, createReducer } from 'redux-act';

export const setCountriesList = createAction('CourierFilters/setCountriesList');
export const setCountry = createAction('CourierFilters/setCountry');
export const setOfficesList = createAction('CourierFilters/setOfficesList');
export const setOffice = createAction('CourierFilters/setOffice');
export const toggleActive = createAction(
  'CourierFilters/toggleActive',
  event => event.target.checked,
);

const initialState = {
  onlyActive: false,
  countryCurrent: '',
  officeCurrent: '',
  countriesList: [],
  officesList: [],
};

const reducer = {};

reducer[setCountriesList] = (state, action) => ({
  ...state,
  countryList: action,
});

reducer[setCountry] = (state, action) => ({
  ...state,
  countryCurrent: action,
  officeCurrent: action ? state.officeCurrent : '',
});

reducer[setOfficesList] = (state, action) => ({
  ...state,
  officesList: action,
});

reducer[setOffice] = (state, action) => ({
  ...state,
  officeCurrent: action,
});

reducer[toggleActive] = (state, action) => ({
  ...state,
  onlyActive: action,
});

export default createReducer(reducer, initialState);
