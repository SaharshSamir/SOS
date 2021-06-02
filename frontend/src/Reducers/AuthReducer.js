import { AUTH } from "../Actions/types";

const defaultState = {
    authData: null
}

export default (store = defaultState, action) => {
    switch (action.type)
    {
        case AUTH:
            if (action)
            {

                localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
                console.log(`inside reducer`);
            }
            return { ...store, authData: action.payload }

        default:
            return { ...store, authData: null }
    }
}