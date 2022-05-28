import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as useAPI from '~/api/userApi';
import * as userAction from '../Actions/useActions';

function* getUsers(action) {
    try {
        const data = yield call(useAPI.getUsers);
        yield put(userAction.fetch_success(data));
    } catch (error) {
        yield put(userAction.fetch_error(error.message));
    }
    console.log(action);
}

function* createUser(action) {
    try {
        const data = yield call(() => useAPI.createUser(action.payload));
        yield put(userAction.create_success(data));
    } catch (error) {
        yield put(userAction.create_error(error.message));
    }
    console.log(action);
}

function* deleteUser(action) {
    yield delay(1000);
    try {
        yield call(() => useAPI.deleteUser(`${action.payload}`));
        yield put(userAction.delete_success(action.payload));
    } catch (error) {
        yield put(userAction.delete_error(error.message));
    }
    console.log(action);
}

function* updateUser(action) {
    try {
        console.log(action.payload);
        const data = yield call(() => useAPI.updateUser(action.payload));
        yield put(userAction.update_success(data));
    } catch (error) {
        yield put(userAction.update_error(error.message));
    }
    console.log(action);
}

export function* userSage() {
    yield takeEvery('users/fetch_request', getUsers);

    yield takeEvery('users/create_request', createUser);
    yield takeLatest('users/delete_request', deleteUser); // tránh spam
    yield takeEvery('users/update_request', updateUser);
}
