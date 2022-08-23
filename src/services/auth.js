import baseApi from "./base";
import axios from "axios"

export function login(payload) {
    return axios.post('/login', payload)
}
export function register(payload) {
    return axios.post('/register', payload)
}