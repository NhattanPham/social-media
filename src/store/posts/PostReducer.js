import * as types from './PostActionTypes'

const initvalue = {
    loadding:true,
    posts:[],
    error:null,

}

export default function postReducer(state=initvalue,{type,payload}) {
    switch (type) {
        case types.FETCH_POST_REQUEST:
        case types.CREATE_POST_REQUEST:
        case types.FETCH_POSTBYUSER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.FETCH_POST_FAIL:
        case types.CREATE_POST_FAIL:
        case types.FETCH_POSTBYUSER_FAIL:
            return{
                ...state,
                loadding:false,
                error:payload
            }
        case types.FETCH_POST_SUCCESS:
            return{
                ...state,
                loadding:false,
                posts:payload
            }
        case types.FETCH_POSTBYUSER_SUCCESS:
            return{
                ...state,
                loadding:false,
                posts:payload
            }
        case types.CREATE_POST_SUCCESS:
            return{
                ...state,
                loadding:false,
                posts:[...state.posts,payload]
            }
        default:
            return state;
    }
}