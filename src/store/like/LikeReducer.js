import * as types from './LikeAcionTypes'

const initValue = {
    loadding:true,
    likeData:null,
    newLike:null,
    error:null
}

export function likeReducer(state = initValue,{type,payload}) {
    switch (type) {
        case types.FETCH_LIKE_REQUEST:
        case types.CREATE_LIKE_REQUEST:
        case types.DELETE_LIKE_REQUEST:
        case types.FETCH_LIKEBYUSER_REQUEST:
            return initValue;
        case types.FETCH_LIKE_FAIL:
        case types.CREATE_LIKE_FAIL:
        case types.DELETE_LIKE_FAIL:
        case types.FETCH_LIKEBYUSER_FAIL:
            return{
                ...state,
                error:payload
            }
        case types.FETCH_LIKE_SUCCESS:
            return{
                ...state,
                loadding:false,
                likeData:payload,
            }
        case types.FETCH_LIKEBYUSER_SUCCESS:
            return{
                ...state,
                loadding:false,
                likeData:payload
            }
        case types.CREATE_LIKE_SUCCESS:
            return{
                ...state,
                loadding:false,
                likeData:[...state.likeData,payload]
            }
        case types.DELETE_LIKE_SUCCESS:
            return {
                ...state,
                loadding:false,
                likeData:state.likeData.filter((like)=>like.id!==payload.id)
            }
        default:
            return state;
    }
}