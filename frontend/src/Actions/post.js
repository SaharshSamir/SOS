import { FETCH_ALL, UPDATE_POST, UPLOAD_POST } from "./types";
import axios from 'axios';


if (localStorage.getItem('profile'))
{
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
}

export const upload = (formData) => {
    return async dispatch => {
        const res = await axios.post("/api/upload", formData);
        dispatch({ type: UPLOAD_POST, payload: res.data });
    }
}

export const fetchPosts = () => {
    return async dispatch => {
        try
        {
            const res = await axios.get("/api/timeline/posts")
            dispatch({ type: FETCH_ALL, payload: res.data })
        } catch (error)
        {
            console.log(error.message);
        }
    }
}

export const likePost = (data) => {
    return async dispatch => {
        try
        {
            const res = await axios.post("/api/post/like", data);
            dispatch({ type: UPDATE_POST, payload: res.data })
        } catch (e)
        {
            console.log(e.message);
        }
    }
}