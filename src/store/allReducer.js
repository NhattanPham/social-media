import {combineReducers} from 'redux'
import authReducer from './auth/AuthReducer'
import postReducer from './posts/PostReducer'

export default combineReducers({
    auth:authReducer,
    posts:postReducer
})