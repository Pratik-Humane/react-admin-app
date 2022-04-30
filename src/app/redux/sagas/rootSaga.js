import { all } from 'redux-saga/effects'
import { watcherUserSaga } from './user'

export default function* rootSaga() {
    yield all([
        watcherUserSaga()
    ])
}