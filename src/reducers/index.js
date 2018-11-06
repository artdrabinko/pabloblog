import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { userReducer } from "./userReducer";
import { postsReducer, postReducer } from "./postReducer";

export default combineReducers({
  userLoading: loadingReducer,
  user: userReducer,
  posts: postsReducer,
  post: postReducer
});
