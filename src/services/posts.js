import api from './base'

export function loadPosts(numPage) {
    return api.get(`/posts/?_embed=comments&_expand=user&_sort=id,views&_order=desc&_page=${numPage}&_limit=10`)
}
export function loadPostsByUser(userId){
    return api.get(`/posts?userId=${userId}&_embed=comments&_expand=user&_sort=id,views&_order=desc`)
}
export function createPost(payload){
    return api.post('/posts',payload)
}
export function editPost(postId,payload){
    return api.patch(`/posts/${postId}`,payload)
}
export function deletePost(postId){
    return api.delete(`/posts/${postId}`)
}