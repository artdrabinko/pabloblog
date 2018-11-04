import React, { Component } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import {
  Jumbotron,
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
//import { signIn } from "../actions/authActions";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      visible: false,
      errorMessage: ""
    };
  }

  signInWithGoogle = () => {
    /*firebaseApp.auth().signInWithRedirect(provider);
   firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });*/
  };

  /*signIn = () => {
    console.log(this.state);
    const { email, password } = this.state;

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        const { uid } = data.user;
        this.props.signIn({ uid });
        //browserHistory.replace("/app");
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code, message);

        this.setState({
          visible: true,
          errorMessage: message
        });
      });
  };*/

  /*componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user yes", user);
        const { displayName, photoURL, email, uid } = user;

        this.props.logUser({ displayName, photoURL, email });
        this.props.signIn({ uid });

        //browserHistory.replace("/app");
      } else {
        console.log("error no", user);
        browserHistory.replace("/signin");
      }
    });
  }*/

  render() {
    return (
      <Jumbotron>
        <Form className="col-6 mt-5">
          <h3>SignIn</h3>
          <Alert
            color="danger"
            isOpen={this.state.visible}
            toggle={() => {
              this.setState({ visible: !this.state.visible });
            }}
          >
            {this.state.errorMessage}
          </Alert>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@gmail.com"
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
            <Label for="examplePassword" className="mr-sm-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </FormGroup>
          <Button color="primary" onClick={this.signIn}>
            SignIn
          </Button>
          <Button color="primary" onClick={this.signInWithGoogle}>
            SignIn with Google
          </Button>
          <div className="mt-3">
            <Link to="/signup">Sign up</Link>
          </div>
        </Form>
      </Jumbotron>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth
  };
}

export default connect(
  mapStateToProps,
  {}
)(SignIn);
