import {combineReducer} from 'redux'
import authReducer from './auth/AuthReducer'

export default combineReducer({
    auth:authReducer
})