import { AUTH } from './types';
import axios from 'axios';


export const signUp = (formData) => {
    return async dispatch => {
        const res = await axios.post("http://localhost:5000/auth/signUp", formData);

        dispatch({ type: AUTH, payload: res.data });

        console.log(`from auth action, ${res.data}`);
    }
}