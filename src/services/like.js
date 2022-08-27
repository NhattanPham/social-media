import api from './base'

export function checkLike() {
    return api.get(`/likes`)    
}
export function createLike(payload) {
    return api.post('/likes',payload)
}
export function deleteLike(likeId) {
    return api.delete(`/likes/${likeId}`)
}