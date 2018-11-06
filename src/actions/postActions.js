import { firebaseDB, database } from "../firebase";

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";

export const getPosts = () => (dispatch) => {
  database.on("value", (snap) => {
    const posts = [];

    snap.forEach((post) => {
      const { title, body, imgURL, createdAt } = post.val();
      const serverKey = post.key;

      posts.push({ serverKey, title, body, imgURL, createdAt });
    });

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  });
};

export const getPost = (postId) => (dispatch) => {
  firebaseDB
    .ref("/posts/" + postId)
    .once("value")
    .then((snap) => {
      dispatch({
        type: GET_POST,
        payload: {
          serverKey: postId,
          ...snap.val()
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
