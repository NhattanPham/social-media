import *  as types from './AuthAcionTypes'

const initvalue = {
    loading:false,
    user:null,
    error:null,
    registerSuccess:false

}
export default function authReducer(state=initvalue,{type,payload}){
    switch (type) {
        case types.LOGIN_FAIL:
        case types.REGISTER_FAIL:
            return{
                ...state,
                loading:true,
                error:payload
            }
        case types.LOGIN_REQUEST:
        case types.REGISTER_REQUEST:
            return{
                ...state,
                loading:false,
                error:null,
            }
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                loading:true,
                user:payload
            }
        case types.REGISTER_SUCCESS:
            return{
                ...state,
                loading:true,
                registerSuccess:true
            }
        default:
            return state;
    }
}