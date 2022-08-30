import axios from "axios";

const API_POINT = 'https://db-socialmedia-tan.herokuapp.com/api'
// const API_POINT = 'http://localhost:3005/api'

const getToken=()=>{
    const token = localStorage.getItem('token')
    return token? `Bear${token}`:null
}

const baseApi = axios.create({
    baseURL:API_POINT
})

baseApi.interceptors.request.use(
    function (config) {
        config.headers.authorization = getToken()
        return config
      },
    function (error){
        return Promise.reject(error)
    }
    
)
export default baseApi