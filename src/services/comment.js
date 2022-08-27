import api from './base'

export function createComment(payload) {
    return api.post('/comment',payload)    
}