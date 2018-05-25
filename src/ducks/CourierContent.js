import { createAction, createReducer } from 'redux-act';

export const setCouriersList = createAction('CourierContent/setCouriersList');
export const addCouriersList = createAction('CourierContent/addCouriersList');
export const fetchingCouriers = createAction('CourierContent/fetchingCouriers');
export const fetchCouriersList = createAction(
  'CourierContent/fetchCouriersList',
);
const initialState = {
  couriersList: [],
  loading: false,
};

const reducer = {};

reducer[addCouriersList] = (state, action) => ({
  ...state,
  couriersList: [...state.couriersList, ...action],
  loading: false,
});

reducer[setCouriersList] = (state, action) => ({
  ...state,
  couriersList: [...state.couriersList, ...action],
  loading: false,
});

reducer[fetchingCouriers] = state => ({
  ...state,
  loading: true,
});

export default createReducer(reducer, initialState);
