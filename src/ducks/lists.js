import { createAction, createReducer } from 'redux-act';

export const fetchCountries = createAction('Lists/fetchCountries');
export const setCountries = createAction('Lists/setCountries');

export const fetchOffices = createAction('Lists/fetchOffices');
export const setOffices = createAction('Lists/setOffices');

export const fetchLayers = createAction('Lists/fetchLayers');
export const setLayers = createAction('Lists/setLayers');

const initialState = {
  countries: [],
  offices: [],
  layers: [],
};

const reducer = {};

reducer[setCountries] = (state, action) => ({
  ...state,
  countries: action,
});

reducer[setOffices] = (state, action) => ({
  ...state,
  offices: action,
});

reducer[setLayers] = (state, action) => ({
  ...state,
  layers: action,
});

export default createReducer(reducer, initialState);
