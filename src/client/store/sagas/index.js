import { all } from 'redux-saga/effects';
import healthSaga from './healthSaga';

export default function* rootSaga() {
  yield all([
    healthSaga(),
  ]);
}
