import {createStore,applyMiddleware} from 'redux'
import allReducer from './allReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

function muLoggerMiddleware(store){
    return function(next){
        return function(action){
            // console.log('store',store)
            next(action)
        }
    }
}
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk,muLoggerMiddleware)))