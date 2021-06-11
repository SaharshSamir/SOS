import { FETCH_ALL } from "./types";
import axios from 'axios';

if (localStorage.getItem('profile'))
{
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
}

export const upload = (formData) => {
    return async dispatch => {
        console.log("in action creator")
        const res = await axios.post("/api/upload", formData);
        console.log(res);
    }
}

export const fetchPosts = () => {
    return async dispatch => {
        try
        {
            const res = await axios.get("/api/timeline/posts", { timeout: 1000 })
            console.log(res);
            dispatch({ type: FETCH_ALL, payload: res.data })
        } catch (error)
        {
            console.log(error.message);
        }
    }
}