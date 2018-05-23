import { delay } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api';
import {
  fetchCouriersList,
  fetchingCouriers,
  setCouriersList,
  addCouriersList,
} from '../ducks/CourierContent';
import { getCountry, getOffice, getOnlyActive } from '../selectors/filters';
import { getCouriers, getCourierId } from '../selectors/couriers';
import {
  openModal,
  fetchCourierById,
  setCourierData,
} from '../ducks/CourierEditModal';
// import { setCountry } from '../ducks/CourierFilters';

function* fetchCouriers({ payload }) {
  const couriers = yield select(getCouriers);

  if (couriers.length !== 0) yield call(delay, 700);

  const countryId = yield select(getCountry);
  const officeId = yield select(getOffice);
  const active = yield select(getOnlyActive);

  try {
    yield put(fetchingCouriers());
    const params = { countryId, officeId, active };
    const { data } = yield api.get('/couriers', { params });

    yield put(
      payload === 'add' ? addCouriersList(data) : setCouriersList(data),
    );
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchCourier() {
  const courierId = yield select(getCourierId);

  try {
    yield put(fetchCourierById());

    const { data } = yield api.get(`/couriers/${courierId}`);

    yield put(setCourierData(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}
export default function*() {
  yield takeLatest(fetchCouriersList, fetchCouriers);
  yield takeLatest(openModal, fetchCourier);
  // yield takeLatest(setCountry, fetchCouriers);
}
