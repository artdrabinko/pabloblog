import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/userActions";

const SignedInLinks = (props) => {
  const signOut = (e) => {
    e.preventDefault();
    props.signOut();
  };

  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <Link className="nav-link" to="/new">
          New post
        </Link>
      </NavItem>
      <NavItem>
        <a href="#" onClick={signOut}>
          sign out
        </a>
      </NavItem>
    </Nav>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { signOut }
)(SignedInLinks);
