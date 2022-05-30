import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../RootReducer/RootReducer'

import createSagaMiddleware from 'redux-saga'


const sagaMiddleware = createSagaMiddleware()

import rootSaga from '../RootSaga/RootSaga'




export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)