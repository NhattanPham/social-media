import api from './base'

export function loadPosts() {
    return api.get('/posts/?_embed=comments&_expand=user')
}
export function loadPostsByUser(userId){
    return api.get(`/posts?userId=${userId}&_embed=comments&_expand=user`)
}
export function createPost(payload){
    return api.post('/posts',payload)
}