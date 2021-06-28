import { FETCH_ALL, UPDATE_POST, UPLOAD_POST } from "../Actions/types";
import moment from 'moment';

export default (state = [], action) => {
    switch (action.type)
    {
        case FETCH_ALL:
            console.log(action.payload);
            
            // console.log(action.payload.sort((a, b) => {
            //     return (moment(a.createdAt).isBefore(b.createdAt));
            // }))
            return action.payload;

        case UPLOAD_POST:
            return [...state, action.payload.newPost];

        case UPDATE_POST:
            console.log(action);
            return state.map(post => post._id === action.payload._id ? action.payload : post);
        default:
            return state
    }
}