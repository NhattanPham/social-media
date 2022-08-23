import * as types from './AuthAcionTypes'
import { login as loginApi, register as registerApi } from '../../services'

const loginAction = (payload) = async (dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_REQUEST
        })
        const result = await loginApi(payload);
        if (result.status === 201) {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: result.data
            })
        }
    } catch (error) {
        dispatch({
            type: types.LOGIN_FAIL,
            payload: error
        })
    }

}
const registerAction = (payload) = async (dispatch) => {
    try {
        dispatch({
            type: types.REGISTER_REQUEST
        })
        const result = await registerApi(payload);
        if (result.status === 201) {
            dispatch({ 
                type: types.REGISTER_SUCCESS, 
                payload:result.data
            })
        }
    } catch (error) {
        dispatch({
            type:types.REGISTER_FAIL,
            payload:error
        })
    }
}
export {
    loginAction,
    registerAction
}