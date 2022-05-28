import { all } from 'redux-saga/effects';
import { userSage } from './userSage';

export default function* rootSage() {
    yield all([userSage()]);
}
