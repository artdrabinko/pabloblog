import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import SideBar from "../mainPage/SideBar";
import { connect } from "react-redux";
import { getPost, removePost, setPostsFilter } from "../../actions/postActions";
import renderHTML from "react-render-html";
import Disqus from "disqus-react";

class ViewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false
    };

    this.isNewFilterExist = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filter !== nextProps.filter) {
      this.isNewFilterExist = true;
    }

    return true;
  }

  componentDidMount() {
    const { match } = this.props;
    const postId = match.params.id;
    this.props.getPost(postId);
  }

  hendelRemovePost = (postId) => {
    this.props.removePost(postId);
    this.setState({
      isDeleted: true
    });
  };

  render() {
    if (!this.props.post) return null;
    if (this.state.isDeleted) return <Redirect to="/" />;
    if (this.isNewFilterExist) {
      if (this.props.filter) return <Redirect to="/" />;
    }

    const { serverKey, title, body, createdAt, imgURL } = this.props.post;
    console.log(this.props.post);
    console.log(serverKey);

    const d = new Date(parseInt(createdAt, 10));
    const disqusShortname = "sp641004";
    const disqusConfig = {
      url: "http://localhost.com/posts/",
      identifier: serverKey,
      title: title
    };
    const strCreatedAt = `Posted on ${d.toLocaleString()}, ${d.getFullYear()}`;
    const { user } = this.props;
    const adminButtons = user ? (
      <div>
        <Link to={"/edit/" + serverKey} className="btn btn-primary mr-3">
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            this.hendelRemovePost(serverKey);
          }}
        >
          Remove
        </button>
      </div>
    ) : (
      <div>No login</div>
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="mt-4">{title}</h1>
            {adminButtons}
            <hr />
            <p>{strCreatedAt}</p>
            <hr />
            <img className="img-fluid rounded" src={imgURL} alt="" />
            <hr />
            {renderHTML(body)}
            <hr />
            <Disqus.CommentCount
              shortname={disqusShortname}
              config={disqusConfig}
            >
              Comments
            </Disqus.CommentCount>
            <div className="article">
              <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
    filter: state.filter
  };
}

export default connect(
  mapStateToProps,
  { getPost, removePost, setPostsFilter }
)(ViewPost);
