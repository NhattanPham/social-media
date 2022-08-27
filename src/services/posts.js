import api from './base'

export function loadPosts() {
    return api.get('/posts/?_embed=comments&_expand=user&_embed=likes')
}
