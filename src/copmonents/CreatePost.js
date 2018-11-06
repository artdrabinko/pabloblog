import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { database, firebaseStorage, storageRef } from "../firebase";
import { connect } from "react-redux";
import {
  Button,
  FormText,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert,
  Progress
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class CreatePost extends Component {
  state = {
    title: "",
    body: "",
    imgURL: "",
    isOpenAlert: false,
    file: null,
    isLoading: false,
    loadProgress: 0
  };

  hendlerSubmitForm = (e) => {
    e.preventDefault();
    const { title, body, imgURL } = this.state;
    const createdAt = +new Date();
    console.log(createdAt);

    const post = { title, body, imgURL, createdAt };

    database
      .push(post)
      .then((res) => {
        console.log(res);
        this.setState({
          isOpenAlert: true
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isOpenAlert: true
        });
      });
  };

  hendlerInputTitle = (e) => {
    const { value } = e.target;
    this.setState({
      title: value,
      isOpenAlert: false
    });
  };

  hendlerInputBody = (e) => {
    const { value } = e.target;
    this.setState({
      body: value,
      isOpenAlert: false
    });
  };

  hendlerPostImage = (e) => {
    const { files } = e.target;

    console.log(files);

    this.setState({
      file: files[0]
    });
    console.log(this.state);
  };

  hendlerLoadButton = () => {
    const { file } = this.state;
    if (file === null) return;

    this.setState({
      isLoading: true,
      file: null
    });

    // Create the file metadata
    const metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef
      .child("images/posts/" + new Date())
      .put(file, metadata);

    const self = this;
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebaseStorage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({
          loadProgress: progress
        });
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          self.setState({
            isLoading: false,
            loadProgress: 0,
            imgURL: downloadURL
          });
        });
      }
    );
  };

  onDismiss = () => {
    this.setState({
      isOpenAlert: false
    });
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container pt-3">
        <Form onSubmit={this.hendlerSubmitForm}>
          <Row>
            <Col md="8">
              <Alert
                isOpen={this.state.isOpenAlert}
                color="success"
                toggle={this.onDismiss}
              >
                Post successfully created!
              </Alert>
              <FormGroup>
                <Label for="inputPostTitle">Title</Label>
                <Input
                  id="inputPostTitle"
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={this.hendlerInputTitle}
                />
              </FormGroup>

              <FormGroup>
                <Label>Body</Label>
                <ReactQuill
                  modules={CreatePost.modules}
                  formats={CreatePost.formats}
                  placeholder="Body"
                  value={this.state.body}
                  onChange={(value) => {
                    this.setState({ body: value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="inputPostImage">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="inputPostImage"
                  onChange={this.hendlerPostImage}
                />
                <FormText color="muted">Please select image for post</FormText>
                {this.state.isLoading ? (
                  <Progress
                    animated
                    color="success"
                    value={this.state.loadProgress}
                  />
                ) : null}
                {this.state.file ? (
                  <Button color="success mt-2" onClick={this.hendlerLoadButton}>
                    Load File
                  </Button>
                ) : null}
              </FormGroup>
              {this.state.title && this.state.body ? (
                <Button color="primary">Create post</Button>
              ) : null}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

CreatePost.modules = {
  toolbar: [
    [{ header: "2" }, { header: "3" }, { header: "4" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
    ["code-block"]
  ]
};

CreatePost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "code-block"
];

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(CreatePost);
