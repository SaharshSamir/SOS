import { AUTH, LOGOUT } from './types';
import axios from 'axios';


const hostUrl = "https://frozen-dawn-51421.herokuapp.com";

export const signUp = (formData, router) => {
    return async dispatch => {
        try
        {

            const res = await axios.post(`${hostUrl}/auth/signUp`, formData);
            router.push("/timeline");
            dispatch({ type: AUTH, payload: res.data });

            console.log(`from auth action, ${res.data}`);
        } catch (error)
        {
            console.log(error.message);
        }
    }
}

export const logIn = (formData, router) => {
    return async dispatch => {
        try
        {

            const res = await axios.post(`${hostUrl}/auth/logIn`, formData);
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