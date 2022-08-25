import * as types from './PostActionTypes'
import { loadPosts } from '../../services/posts'

const loadPostsAction = ()=> async (dispatch) =>{
    try {
        dispatch({
            type:types.FETCH_POST_REQUEST
        })
        const result = await loadPosts();
        console.log('result posts',result)
        if(result.status===200){
            dispatch({
                type:types.FETCH_POST_SUCCESS,
                payload:result.data
            })
        }
    } catch (error) {
        dispatch({
            type:types.FETCH_POST_FAIL,
            payload:error
        })
    }
    
}
export {
    loadPostsAction
}