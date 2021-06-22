import axios from 'axios';
import { FETCH_PROFILE } from "./types";

export const fetchProfile = (userId) => {
    console.log("inside action creator");
    return async dispatch => {
        const res = await axios.get(`/profile?userId=${userId}`);
        dispatch({ type: FETCH_PROFILE, payload: res.data });
    }
}