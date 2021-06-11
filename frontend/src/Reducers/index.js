import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducers from "./PostsReducer";

export default combineReducers({
    auth: AuthReducer,
    posts: PostsReducers
})