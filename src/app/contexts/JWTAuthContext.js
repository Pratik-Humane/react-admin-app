import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { API_URL } from './constants'
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    message: '',
    forgotPassMessage: '',
    resetPassMessage: '',
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { message } = action.payload
            return {
                ...state,
                isAuthenticated: false,
                message,
            }
        }
        case 'FORGOT_PASSWORD': {
            const { message } = action.payload
            return {
                ...state,
                isAuthenticated: false,
                forgotPassMessage: message,
            }
        }
        case 'RESET_PASSWORD': {
            const { message } = action.payload
            return {
                ...state,
                isAuthenticated: false,
                resetPassMessage: message,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    forgotPassword: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password,
        })
        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post(`${API_URL}/api/auth/register`, {
            email,
            username,
            password,
        })

        const { message } = response.data
        dispatch({
            type: 'REGISTER',
            payload: {
                message,
            },
        })
    }

    const forgotPassword = async (email) => {
        const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
            email
        })

        const { message } = response.data
        dispatch({
            type: 'FORGOT_PASSWORD',
            payload: {
                message,
            },
        })
    }

    const resetPassword = async (password, c_password, verification_code) => {
        const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
            verification_code, password, c_password
        })
        const { message } = response.data
        dispatch({
            type: 'RESET_PASSWORD',
            payload: {
                message,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get(`${API_URL}/api/auth/profile`)
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
