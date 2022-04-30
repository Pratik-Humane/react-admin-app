import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './reducers/RootReducer'
import rootSaga from './sagas/rootSaga'

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, sagaMiddleware]
let devtools = (x) => x

if (
    process &&
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const Store = createStore(
    RootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools)
)

sagaMiddleware.run(rootSaga)
