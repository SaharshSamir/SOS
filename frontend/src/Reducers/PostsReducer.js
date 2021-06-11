import { FETCH_ALL } from "../Actions/types";

export default (state = [], action) => {
    switch (action.type)
    {
        case FETCH_ALL:
            console.log(action);
            return action.payload;

        default:
            return state
    }
}