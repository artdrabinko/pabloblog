import { GET_POSTS } from "../actions/postActions";

const initialState = [];

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return payload;
    default:
      return state;
  }
};
