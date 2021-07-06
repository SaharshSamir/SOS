import { FETCH_ALL, UPDATE_POST, UPLOAD_POST } from "../Actions/types";
import moment from 'moment';

export default (state = [], action) => {
    switch (action.type)
    {
        case FETCH_ALL:
            
            return action.payload;

        case UPLOAD_POST:
            return [...state, action.payload.newPost];

        case UPDATE_POST:
            return state.map(post => post._id === action.payload._id ? action.payload : post);
        default:
            return state
    }
}