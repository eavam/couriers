import { delay } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api';
import {
  fetchCouriersList,
  fetchingCouriers,
  setCouriersList,
} from '../ducks/CourierContent';
import { getCountry, getOffice, getOnlyActive } from '../selectors/filters';
import { getCouriers, getCourierId } from '../selectors/couriers';
import {
  openModal,
  fetchCourierById,
  setCourierData,
  fetchSchedulesList,
  setSchedules,
} from '../ducks/CourierEditModal';
import {
  fetchCountriesList,
  setCountriesList,
  fetchOfficesList,
  setOfficesList,
} from '../ducks/CourierFilters';

function* fetchCountries({ payload }) {
  try {
    if (payload) yield put(setCountriesList([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get('/countries', { params });

    yield put(setCountriesList(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchOffices({ payload }) {
  const countryId = yield select(getCountry);
  try {
    if (payload) yield put(setOfficesList([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get(`/countries/${countryId}/offices`, {
      params,
    });

    yield put(setOfficesList(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* couriers({ payload: params }) {
  const couriersList = yield select(getCouriers);

  if (couriersList.length !== 0) yield call(delay, 300);

  try {
    yield put(fetchingCouriers());
    const { data } = yield api.get('/couriers', { params });

    yield put(setCouriersList(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchSchedules({ payload }) {
  try {
    if (payload) yield put(setSchedules([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get(`/schedules`, {
      params,
    });

    yield put(setSchedules(data));
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
  yield takeLatest(fetchCouriersList, couriers);
  yield takeLatest(fetchCountriesList, fetchCountries);
  yield takeLatest(fetchOfficesList, fetchOffices);
  yield takeLatest(openModal, fetchCourier);
  yield takeLatest(fetchSchedulesList, fetchSchedules);
}
