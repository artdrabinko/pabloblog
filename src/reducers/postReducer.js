import { GET_POSTS, GET_POST } from "../actions/postActions";

//const initialState = [];

export const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return payload;
    default:
      return state;
  }
};

export const postReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_POST:
      return payload;
    default:
      return state;
  }
};
