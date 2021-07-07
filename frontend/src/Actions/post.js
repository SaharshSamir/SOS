import { FETCH_ALL, UPDATE_POST, UPLOAD_POST} from "./types";
import axios from 'axios';


if (localStorage.getItem('profile'))
{
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
}

export const upload = (formData) => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return async dispatch => {
        const res = await axios.post("/api/upload", formData);
        dispatch({ type: UPLOAD_POST, payload: res.data });
    }
}

export const update = (formData) => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return async dispatch => {
        try {
            const res = await axios.post("/api/post/update", formData);
            dispatch({type: UPDATE_POST, payload: res.data._doc});
            
        } catch (e) {
            console.error(e);
        }
    }
}

export const fetchPosts = () => {
    return async dispatch => {
        try
        {
            const res = await axios.get("/api/timeline/posts")
            dispatch({ type: FETCH_ALL, payload: res.data })
        } catch (e)
        {
            console.error(e.message);
        }
    }
}

export const likePost = (data) => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return async dispatch => {
        try
        {
            const res = await axios.post("/api/post/like", data);
            dispatch({ type: UPDATE_POST, payload: res.data })
        } catch (e)
        {
            console.error(e.message);
        }
    }
}

export const commentPost = data => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return async dispatch => {
        try {
            const res = await axios.post("/api/post/comment", data);
            dispatch({type: UPDATE_POST, payload: res.data.newPost})
        } catch (e) {
            console.error(e.message);
        }
    }
}

export const deleteComment = (postId, commentId) => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return async dispatch => {
        try {
            const res = await axios.post(`/api/post/comment/delete`, {postId, commentId})
            dispatch({type: UPDATE_POST, payload: res.data.newPost})
        } catch (e) {
            console.error(e.message);
        }
    }
}

export const deletePost = id => {
    if (localStorage.getItem('profile'))
    {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return async dispatch => {
        try {
            await axios.delete(`/api/post/delete/${id}`);
            const res = await axios.get("/api/timeline/posts");
            dispatch({ type: FETCH_ALL, payload: res.data });
            
        } catch (e) {
            console.error(e.message);
        }
    }
}