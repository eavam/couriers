import { delay } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import api from '../api';

import { getCouriersFilters } from '../selectors/filters';
import { getCourierId } from '../selectors/couriers';
import {
  openModal,
  fetchCourierById,
  setCourierData,
  fetchSchedulesList,
  setSchedules,
} from '../ducks/CourierEditModal';
import {
  fetchCountries,
  setCountries,
  fetchOffices,
  setOffices,
  fetchLayers,
  setLayers,
} from '../ducks/lists';

function* coutries({ payload }) {
  try {
    if (payload) yield put(setCountries([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get('/countries', { params });

    yield put(setCountries(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* offices({ payload }) {
  const { countryId } = yield select(getCouriersFilters);
  try {
    if (payload) yield put(setOffices([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get(`/countries/${countryId}/offices`, {
      params,
    });

    yield put(setOffices(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* layers({ payload }) {
  try {
    if (payload) yield put(setLayers([]));
    yield call(delay, 700);

    const params = { q: payload, limit: 100 };
    const { data } = yield api.get('/layers', {
      params,
    });

    yield put(setLayers(data));
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* schedules({ payload }) {
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

function* courier() {
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
  yield takeLatest(fetchCountries, coutries);
  yield takeLatest(fetchOffices, offices);
  yield takeLatest(fetchLayers, layers);
  yield takeLatest(openModal, courier);
  yield takeLatest(fetchSchedulesList, schedules);
}
