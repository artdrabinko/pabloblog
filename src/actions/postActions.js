import { database } from "../firebase";

export const GET_POSTS = "GET_POSTS";

export const getPosts = () => (dispatch) => {
  console.log("getPosts");

  database.on("value", (snap) => {
    const posts = [];

    snap.forEach((post) => {
      const { title, body } = post.val();
      const serverKey = post.key;

      posts.push({ title, body, serverKey });
    });

    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  });
};
