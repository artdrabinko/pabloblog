import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";

export class ListPosts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts = () => {
    return this.props.posts.map((post) => {
      return <Post key={post.serverKey} />;
    });
  };

  render() {
    return (
      <div className="col-md-8">
        <h1 className="my-4">
          Posts <small>by Pavel Hrinevich</small>
        </h1>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { getPosts }
)(ListPosts);
