import * as types from './PostActionTypes'
import { loadPosts,loadPostsByUser,createPost } from '../../services/posts'

const loadPostsAction = (numPage)=> async (dispatch) =>{
    try {
        dispatch({
            type:types.FETCH_POST_REQUEST
        })
        const result = await loadPosts(numPage);
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
const loadPostsByUserAction = (userId)=> async (dispatch)=>{
    try {
        dispatch({
            type:types.FETCH_POSTBYUSER_REQUEST
        })
        const result = await loadPostsByUser(userId)
        if(result.status === 200){
            dispatch({
                type:types.FETCH_POSTBYUSER_SUCCESS,
                payload:result.data
            })
        }
    } catch (error) {
        dispatch({
            type:types.FETCH_POSTBYUSER_FAIL,
            payload:error
        })
    }
}
const createPostAction = (payload)=>async (dispatch)=>{
    try{
        dispatch({
            type:types.CREATE_POST_REQUEST
        })
        const result = await createPost(payload)
        console.log(result)
        if(result.status === 201){
            dispatch({
                type:types.CREATE_POST_SUCCESS,
                payload:result.data
            })
        }
    }catch (error) {
        dispatch({
            type:types.CREATE_POST_FAIL,
            payload:error
        })
    }
}
const loadPostsScrollAction = (numPage)=> async (dispatch) =>{
    console.log('actoin num page',numPage)
        const result = await loadPosts(numPage);
        if(result.status===200){
            dispatch({
                type:types.FETCH_POST_SCROLL,
                payload:result.data
            })
        }
    
}
const reloadPostAction = (numPage)=>async (dispatch)=>{
    const result = await loadPosts(numPage);
    if(result.status===200){
        dispatch({
            type:types.RELOAD_POST,
            payload:result.data
        })
    }
}
export {
    loadPostsAction,
    loadPostsByUserAction,
    createPostAction,
    loadPostsScrollAction,
    reloadPostAction
}