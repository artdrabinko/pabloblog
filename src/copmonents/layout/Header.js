import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import { connect } from "react-redux";

class Header extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { user } = this.props;
    const links = user ? <SignedInLinks /> : <div>Login Button</div>;

    return (
      <header>
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <div className="container">
            <Link className="navbar-brand" to="/">
              PabloBlog
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {links}
            </Collapse>
          </div>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
