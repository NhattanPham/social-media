import api from "./base"

export function getUsers() {
    return api.get('/users')
}
export function getUserById(userId){
    return api.get(`/users/${userId}`)
}
export function editUser(userId,payload){
    return api.patch(`/users/${userId}`,payload)
}
export function login(payload) {
    return api.post('/signin', payload)
}
export function register(payload) {
    return api.post('/register', payload)
}
