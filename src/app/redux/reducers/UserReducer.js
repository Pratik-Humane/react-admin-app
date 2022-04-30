const { USER_LOADING_REQUEST, GET_USER_PROFILE, LOGOUT } = require("../actions/UserAction")
const initialState = {}
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING_REQUEST: {
            return { ...state, loading: true }
        }
        case GET_USER_PROFILE: {
            return { ...state, ...action.payload }
        }
        case LOGOUT: {
            return { ...initialState }
        }
        default: {
            return state
        }
    }
}

export default UserReducer