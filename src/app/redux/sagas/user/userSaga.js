import { call, put, takeEvery } from 'redux-saga/effects'
import {
    GET_USER_PROFILE,
    USER_LOADING_REQUEST,
    UPDATE_USER_PROFILE_REQUEST,
    PROFILE_ERROR,
    PROFILE_SUCCESS
} from '../../actions/UserAction'
import { fetchUserProfile, postUpdateUserProfile } from '../../apis/user'


function* handleProfileUpdate({ payload }) {
    try {
        const { message } = yield call(postUpdateUserProfile, payload)
        yield put({ type: PROFILE_SUCCESS, payload: { message } })
        yield put({ type: USER_LOADING_REQUEST })
    } catch (error) {
        yield put({ type: PROFILE_ERROR, payload: { error: error.message } })
    }
}

function* watcherPostUserProfile() {
    yield takeEvery(UPDATE_USER_PROFILE_REQUEST, handleProfileUpdate)
}

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

const userSaga = [
    watcherUserSaga,
    watcherPostUserProfile
]

export default userSaga