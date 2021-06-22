import { FETCH_PROFILE } from "../Actions/types";


export default (state = {}, action) => {
    switch (action.type)
    {
        case FETCH_PROFILE:
            const profile = action.payload;
            console.log(profile);
            return { ...state, profile }
        default:
            return state;
    }
}