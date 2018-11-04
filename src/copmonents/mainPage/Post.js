import React from "react";

const Post = (props) => {
  return (
    <div className="card mb-4">
      <img className="card-img-top" src={props.imgUrl} alt="Card image cap" />
      <div className="card-body">
        <h2 className="card-title">Post Title</h2>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
          aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta
          expedita corporis animi vero voluptate voluptatibus possimus, veniam
          magni quis!
        </p>
        <a href="/" className="btn btn-primary">
          Read More →
        </a>
      </div>
      <div className="card-footer text-muted">
        Posted on January 1, 2017 by
        <a href="/">Start Bootstrap</a>
      </div>
    </div>
  );
};

export default Post;
