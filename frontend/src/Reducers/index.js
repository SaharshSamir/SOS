import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducers from "./PostsReducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
    auth: AuthReducer,
    posts: PostsReducers,
    profile: ProfileReducer
})