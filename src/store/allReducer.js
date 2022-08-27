import {combineReducers} from 'redux'
import authReducer from './auth/AuthReducer'
import { likeReducer } from './like/LikeReducer'
import postReducer from './posts/PostReducer'

export default combineReducers({
    auth:authReducer,
    posts:postReducer,
    like:likeReducer
})