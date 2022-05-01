
export const USER_LOADING_REQUEST = 'LOADING_REQUEST'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST'
export const PROFILE_ERROR = 'PROFILE_ERROR'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const logoutUser = () => ({ type: LOGOUT })
export const getUserProfile = () => ({ type: USER_LOADING_REQUEST })
export const updateUserProfile = payload => ({ type: UPDATE_USER_PROFILE_REQUEST, payload })