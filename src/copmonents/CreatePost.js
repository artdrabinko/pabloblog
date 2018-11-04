import React, { Component } from "react";
import { database } from "../firebase";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert
} from "reactstrap";

class CreatePost extends Component {
  state = {
    title: "",
    body: "",
    isOpenAlert: false
  };

  hendlerSubmitForm = (e) => {
    e.preventDefault();
    const { title, body } = this.state;
    const post = { title, body };

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

  onDismiss = () => {
    this.setState({
      isOpenAlert: false
    });
  };

  render() {
    return (
      <div className="container pt-3">
        <Alert
          isOpen={this.state.isOpenAlert}
          color="success"
          toggle={this.onDismiss}
        >
          Post successfully created!
        </Alert>
        <Form onSubmit={this.hendlerSubmitForm}>
          <Row>
            <Col md="6">
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
                <Label for="inputPostBody">Body</Label>
                <Input
                  id="inputPostBody"
                  type="textarea"
                  name="body"
                  placeholder="Body"
                  onChange={this.hendlerInputBody}
                />
              </FormGroup>
              <Button color="primary">Create post</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default CreatePost;
