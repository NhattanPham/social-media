import axios from "axios";

const API_POINT = 'http://localhost:3005/api'

const baseApi = axios.create({
    baseURL:API_POINT
})
export default baseApi