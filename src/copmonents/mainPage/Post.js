import React from "react";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";

const Post = (props) => {
  console.log(props);
  const d = new Date(parseInt(props.post.createdAt, 10));
  console.log(d);

  const strCreatedAt = `Posted on ${d.toLocaleString()}, ${d.getFullYear()}`;

  return (
    <div className="card mb-4">
      <img
        className="card-img-top"
        src={props.post.imgURL}
        alt="img for the post"
      />
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <p className="card-text">{renderHTML(props.post.body)}</p>
        <Link to={`/post/${props.post.serverKey}`} className="btn btn-primary">
          Read More →
        </Link>
      </div>
      <div className="card-footer text-muted">{strCreatedAt}</div>
    </div>
  );
};

export default Post;
