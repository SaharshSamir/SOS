import { AUTH, LOGOUT, CHECK_USER } from "../Actions/types";



export default (state = {}, action) => {
    switch (action.type)
    {
        case AUTH:
            if (action)
            {

                localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            }

            return { ...state, authData: JSON.parse(localStorage.getItem("profile")) }

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };


        case CHECK_USER:
            console.log({ ...state, authData: action.payload })
            return { ...state, authData: action.payload }

        // return {...state, authData: {}}

        default:
            return { ...state };
    }
}