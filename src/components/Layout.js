import React from "react";
// import {Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout,authCheckState } from "../store/actions/auth";
import { Redirect} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

class CustomLayout extends React.Component {
  componentDidMount(){
    this.props.authCheckState()
  }
  render() {
    const { authenticated,profile } = this.props;
    if (authenticated && !profile){
      return <Redirect to={"/profile"} ></Redirect>
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark" data-spy="affix">
          <Link to="/" className="navbar-brand">Udemy Coding Challenge</Link>
          <Nav className="mr-auto">
            {authenticated? (
              <>
              <Link className="nav-link" to="/profile">Profile</Link>
              <Nav.Link className="nav-link" onClick={() => this.props.logout()}>Logout</Nav.Link></>):
              (
                <React.Fragment>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Signup</Link>
                  <Link to="/users" className="nav-link">Users</Link>
                </React.Fragment>
              )
            }
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    profile: state.auth.profile !== null || state.auth.profile===true,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
