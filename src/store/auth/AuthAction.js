import * as types from './AuthAcionTypes'
import { login, register, editUser } from '../../services'

const loginAction = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_REQUEST
        })
        const result = await login(payload);
        console.log('result', result)
        if (result.status === 200) {
            const { data: { accessToken, user } } = result
            // console.log('token',accessToken)
            localStorage.setItem('token', accessToken)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: user
            })
        }
    } catch (error) {
        dispatch({
            type: types.LOGIN_FAIL,
            payload: error
        })
    }

}
const registerAction = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: types.REGISTER_REQUEST
        })
        const result = await register(payload);
        if (result.status === 201) {
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: result.data
            })
        }
    } catch (error) {
        dispatch({
            type: types.REGISTER_FAIL,
            payload: error
        })
    }
}
const editUserAction = (userId, payload) => async (dispatch) => {
    try {
        dispatch({
            type: types.EDIT_USER_REQUEST
        })
        const result = await editUser(userId,payload)
        if(result.status === 200){
            localStorage.setItem('user', JSON.stringify(result.data))
            dispatch({
                type:types.EDIT_USER_SUCCESS,
                payload: result.data
            })
        }
    } catch (error) {

    }
}
const logoutAction = () => (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch({
        type: types.LOGOUT,

    })

}
export {
    loginAction,
    registerAction,
    editUserAction,
    logoutAction
}