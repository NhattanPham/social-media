import api from './base'

export function getCommentByPost(postId){
    return api.get(`/comments?postId=${postId}&_expand=user`)
}
export function getCommentByUserAndPost(postId,userId){
    return api.get(`/comments?postId=${postId}&userId=${userId}`)
}
export function createComment(payload) {
    return api.post('/comments',payload)    
}
export function deleteComment(commentId){
    return api.delete(`/comments/${commentId}`)
}