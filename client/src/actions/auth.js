import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const signin = (formData, navigate) => async (dispathc) => {
    try {
        // login user
        navigate('/')
    } catch (error){
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispathc) => {
    try {
        // signup user
        navigate('/')
    } catch (error){
        console.log(error)
    }
}
