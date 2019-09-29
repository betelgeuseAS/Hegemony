import React, { Component } from "react";
import {Nav, Navbar} from 'react-bootstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { logoutUser } from "../../actions/auth";

import localization from "../localization/localization";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const {componentLocalize} = this.props;
    const {isAuthenticated} = this.props.auth;

    return (
      <div className="mb-3">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#link" target="_blank">Hegemony</Navbar.Brand>

          {componentLocalize}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {/*<Nav.Link href="#link">Features</Nav.Link>*/}
            </Nav>
            <Nav>
              <Nav.Link href="https://github.com/betelgeuseAS/Retrospective" target="_blank">Retrospective</Nav.Link>
              <Nav.Link href="https://github.com/betelgeuseAS/Hegemony" target="_blank">GitHub</Nav.Link>
              {
                isAuthenticated ?
                <button onClick={this.onLogoutClick} className="btn btn-outline-danger">{localization.logout}</button> :
                false
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);