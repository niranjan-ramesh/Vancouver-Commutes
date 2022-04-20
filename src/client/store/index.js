import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from 'sagas';
import reducers from 'reducers';

const sagaMiddleware = createSagaMiddleware();

const { NODE_ENV } = process.env;
const environment = NODE_ENV || 'development';
const isProd = environment === 'production';

const middleware = isProd ? applyMiddleware(sagaMiddleware)
  : applyMiddleware(createLogger(), sagaMiddleware);
const store = createStore(reducers, middleware);

sagaMiddleware.run(sagas);

export default store;
