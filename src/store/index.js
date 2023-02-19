import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './roomsSlice';
import accountsReducer from './accountsSlice';
import roomsSaga from '../sagas/roomsSaga';
import accountsSaga from '../sagas/accountsSaga';

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
    reducer: { accounts: accountsReducer, rooms: roomsReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(accountsSaga)
sagaMiddleware.run(roomsSaga)