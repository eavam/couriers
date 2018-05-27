import { createAction, createReducer } from 'redux-act';

export const setCourierFilters = createAction('Filters/setCourierFilters');
export const setMacrozoneFilters = createAction('Filters/setMacrozoneFilters');

const initialState = {
  couriers: {},
  macrozone: {},
};

const reducer = {};

reducer[setCourierFilters] = (state, action) => ({
  ...state,
  couriers: action,
});

reducer[setMacrozoneFilters] = (state, action) => ({
  ...state,
  macrozone: action,
});

export default createReducer(reducer, initialState);
