import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { Alert } from "reactstrap";
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

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user yes", user);
        const { displayName, photoURL, email, uid } = user;

        //this.props.logUser({ displayName, photoURL, email });
        //this.props.signIn({ uid });

        //browserHistory.replace("/app");
      } else {
        console.log("error no", user);
        //browserHistory.replace("/signin");
      }
    });
  }

  signIn = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        const { uid } = data.user;
        //this.props.signIn({ uid });
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
  };

  render() {
    const { user } = this.props;
    if (user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="d-flex align-items-center text-center">
        <form onSubmit={this.signIn} className="form-signin">
          <Alert
            color="danger"
            isOpen={this.state.visible}
            toggle={() => {
              this.setState({ visible: !this.state.visible });
            }}
          >
            {this.state.errorMessage}
          </Alert>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control mb-3"
            placeholder="Email address"
            required=""
            autoFocus=""
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control mb-4"
            placeholder="Password"
            required=""
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2018-2019</p>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, user } = state;

  return {
    auth,
    user
  };
}

export default connect(
  mapStateToProps,
  {}
)(SignIn);
