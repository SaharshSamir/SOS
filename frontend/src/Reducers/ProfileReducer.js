import { FETCH_PROFILE } from "../Actions/types";


export default (state = {}, action) => {
    switch (action.type)
    {
        case FETCH_PROFILE:
            const profile = action.payload;
            return { ...state, profile }
        default:
            return state;
    }
}