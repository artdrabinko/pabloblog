import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts, setPostsFilter } from "../../actions/postActions";

export class ListPosts extends Component {
  componentDidMount() {
    if (!this.props.filter) {
      this.props.getPosts();
    }
  }

  renderPosts = () => {
    return this.props.posts.map((post) => {
      return <Post key={post.serverKey} post={post} />;
    });
  };

  render() {
    console.log(this.props);

    return (
      <div className="col-md-8 mt-3">
        <h3>{this.props.posts.length ? null : "No posts .("}</h3>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    filter: state.filter
  };
}

export default connect(
  mapStateToProps,
  { getPosts, setPostsFilter }
)(ListPosts);
