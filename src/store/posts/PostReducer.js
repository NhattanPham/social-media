import * as types from './PostActionTypes'

const initvalue = {
    loadding:true,
    posts:null,
    error:null,

}

export default function postReducer(state=initvalue,{type,payload}) {
    switch (type) {
        case types.FETCH_POST_REQUEST:
            return initvalue
        case types.FETCH_POST_FAIL:
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
        default:
            return state;
    }
}