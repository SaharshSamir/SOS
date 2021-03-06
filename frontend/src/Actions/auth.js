import { AUTH, LOGOUT, CHECK_USER } from './types';
import axios from 'axios';


export const signUp = (formData, router) => {
    return async dispatch => {
        try
        {

            const res = await axios.post("/auth/signUp", formData);
            router.push("/timeline");
            dispatch({ type: AUTH, payload: res.data });

        } catch (error)
        {
            console.log(error.message);
        }
    }
}

export const checkUser = (user, dispatch) => {
    dispatch({ type: CHECK_USER, payload: user });
}

export const logIn = (formData, router) => {
    return async dispatch => {
        try
        {

            const res = await axios.post("/auth/logIn", formData);
            router.push("/timeline");
            dispatch({ type: AUTH, payload: res.data });
        } catch (error)
        {
            console.log(error.message);
        }
    }
}

export const logOut = (dispatch) => {
    dispatch({ type: LOGOUT });
}