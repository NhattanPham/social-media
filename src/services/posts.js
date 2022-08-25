import api from './base'

export function loadPosts() {
    return api.get('/posts/?_expand=user')
}
