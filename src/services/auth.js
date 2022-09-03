import api from "./base"

export function getUsers() {
    return api.get('/users')
}
export function login(payload) {
    return api.post('/signin', payload)
}
export function register(payload) {
    return api.post('/register', payload)
}
