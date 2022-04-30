import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_USER_PROFILE, USER_LOADING_REQUEST } from '../../actions/UserAction'
import { fetchUserProfile } from '../../apis/user'


function* handleGetUser() {
    try {
        const user = yield call(fetchUserProfile)
        yield put({ type: GET_USER_PROFILE, payload: { ...user, loading: false, error: '' } })
    } catch (error) {
        yield put({ type: GET_USER_PROFILE, payload: { loading: false, error: error.message } })
    }
}

function* watcherUserSaga() {
    yield takeEvery(USER_LOADING_REQUEST, handleGetUser)
}

export default watcherUserSaga