import React, { Component } from "react";
import SideBar from "../mainPage/SideBar";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import renderHTML from "react-render-html";
import Disqus from "disqus-react";

class ViewPost extends Component {
  componentDidMount() {
    const { match } = this.props;
    const postId = match.params.id;
    this.props.getPost(postId);
  }

  render() {
    if (!this.props.post) return null;

    const { serverKey, title, body, createdAt, imgURL } = this.props.post;
    console.log(this.props.post);
    console.log(serverKey);

    const d = new Date(parseInt(createdAt, 10));
    const disqusShortname = "sp641004";
    const disqusConfig = {
      url: "http://localhost.com/post/",
      identifier: serverKey,
      title: title
    };
    const strCreatedAt = `Posted on ${d.toLocaleString()}, ${d.getFullYear()}`;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="mt-4">{title}</h1>
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
    post: state.post
  };
}

export default connect(
  mapStateToProps,
  { getPost }
)(ViewPost);
