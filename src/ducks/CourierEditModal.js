import { createAction, createReducer } from 'redux-act';

export const openModal = createAction('CourierEditModal/openModal');
export const closeModal = createAction('CourierEditModal/closeModal');
export const setCourierData = createAction('CourierEditModal/setCourierData');
export const fetchCourierById = createAction(
  'CourierEditModal/fetchCourierById',
);

const initialState = {
  visible: false,
  courierId: null,
  loading: false,
  data: {},
};

const reducer = {};

reducer[openModal] = (state, action) => ({
  ...state,
  visible: true,
  courierId: action.id,
});

reducer[closeModal] = state => ({
  ...state,
  visible: false,
  courierId: null,
});

reducer[fetchCourierById] = state => ({
  ...state,
  loading: true,
});

reducer[setCourierData] = (state, action) => ({
  ...state,
  loading: false,
  data: action,
});

export default createReducer(reducer, initialState);
