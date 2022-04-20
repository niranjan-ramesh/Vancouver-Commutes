import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_HEALTH } from 'constants/actions';
import { updateHealth } from 'actions/healthAction';
import { showSnackbar } from 'actions/snackbarAction';
import { getHealthAPI } from 'api';

export function* workerSaga() {
  try {
    const { message } = yield call(getHealthAPI);
    yield put(updateHealth(message));
  } catch (error) {
    yield put(showSnackbar({ variant: 'error', message: `${error.name}: ${error.message}` }));
  }
}

export default function* watchAction() {
  yield takeEvery(GET_HEALTH, workerSaga);
}
