import { combineReducers } from "redux";
import { loadingReducer } from "./loadingReducer";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

export default combineReducers({
  userLoading: loadingReducer,
  user: userReducer,
  posts: postReducer
});
