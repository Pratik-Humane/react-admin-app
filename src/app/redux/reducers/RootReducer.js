import { combineReducers } from 'redux'
import NavigationReducer from './NavigationReducer'
import UserReducer from './UserReducer'

const RootReducer = combineReducers({
    navigations: NavigationReducer,
    user: UserReducer
})

export default RootReducer
