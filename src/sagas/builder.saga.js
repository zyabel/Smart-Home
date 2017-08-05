import { ADD_DEVICE, EDIT_DEVICE } from '../constants/index';
import DeviceListApi from '../api/deviceListApi';
import {
  addDeviceSuccess,
  addDeviceFailure,
  clearAddStatus,
  editDeviceSuccess
} from '../actions/builder.action';
import { loadDevices } from '../actions/devices.action';
import { delay } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* addDevice (action) {
  const { response, error } =
    yield call(DeviceListApi.addDevice, action.device);

  if (response) {
    yield put(addDeviceSuccess(response));
    yield put(loadDevices());
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* editDevice (action) {
  const { response, error } = yield call(DeviceListApi.getDevice, action.id);

  if (response) {
    yield put(editDeviceSuccess(response));
  } else {
    yield put(addDeviceFailure(error.message));
  }
}

export function* watchAddDevice () {
  yield takeEvery(ADD_DEVICE, addDevice);
}

export function* watchEditDevice () {
  yield takeEvery(EDIT_DEVICE, editDevice);
}

