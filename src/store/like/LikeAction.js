import * as types from './LikeAcionTypes'
import { checkLike ,createLike,deleteLike } from '../../services'

const checkLikeAction = () => async (dispatch)=>{
    try {
        dispatch({
            type:types.FETCH_LIKE_REQUEST
        })
        const result = await checkLike();
        // console.log('result',postId,result)
        if(result.status === 200){
            dispatch({
                type:types.FETCH_LIKE_SUCCESS,
                payload:result.data
            })
        }    
    } catch (error) {
        dispatch({
            type:types.FETCH_LIKE_FAIL,
            payload:error
        })
    }
    
}
const createLikeAction = (payload)=>async (dispatch)=>{
    try {
        dispatch({
            type:types.CREATE_LIKE_REQUEST
        })
        const result = await createLike(payload)
        if(result.status === 201){
            dispatch({
                type:types.CREATE_LIKE_SUCCESS,
                payload:result.data
            })
        }
    } catch (error) {
        dispatch({
            type:types.CREATE_LIKE_FAIL,
            payload:error
        })
    }
}
const deleteLikeAction = (likeId)=>async (dispatch)=>{
    try {
        dispatch({
            type:types.DELETE_LIKE_REQUEST
        })
        const result = await deleteLike(likeId)
        if(result.status === 200){
            dispatch({
                type:types.DELETE_LIKE_SUCCESS
            })
        }
    } catch (error) {
        dispatch({
            type:types.DELETE_LIKE_FAIL,
            payload:error
        })
    }
}
export {
    checkLikeAction,
    // getLikeByuserAction,
    createLikeAction,
    deleteLikeAction
}