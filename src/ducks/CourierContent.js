import { createAction, createReducer } from 'redux-act';

export const setCouriersList = createAction('CourierContent/setCouriersList');
export const addCouriersList = createAction('CourierContent/addCouriersList');
export const fetchingCouriers = createAction('CourierContent/fetchingCouriers');
export const fetchCouriersList = createAction(
  'CourierContent/fetchCouriersList',
);
const initialState = {
  couriersList: [],
  fetchingCouriers: false,
};

const reducer = {};

reducer[setCouriersList] = (state, action) => ({
  ...state,
  couriersList: [...action],
  fetchingCouriers: false,
});

reducer[addCouriersList] = (state, action) => ({
  ...state,
  couriersList: [...state.couriersList, ...action],
  fetchingCouriers: false,
});

reducer[setCouriersList] = (state, action) => ({
  ...state,
  couriersList: [...state.couriersList, ...action],
  fetchingCouriers: false,
});

reducer[fetchingCouriers] = state => ({
  ...state,
  fetchingCouriers: true,
});

export default createReducer(reducer, initialState);
