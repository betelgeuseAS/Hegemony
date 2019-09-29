import React, { Component } from "react";
import {Col, Nav, Navbar} from 'react-bootstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { logoutUser } from "../../actions/auth";

import Localize from "../localization/Localize";
import localization from "../localization/localization";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
    };
  }

  // Localization:
  setLanguage = (language) => {
    localization.setLanguage(language);

    // let gln = localization.getLanguage();
    // let giln = localization.getInterfaceLanguage();

    // localization.formatString(localization.currentDate, { //to format the passed string replacing its placeholders with the other arguments strings
    //   month: localization.january,
    //   day: 12,
    //   year: 2018
    // });
    // localization.formatString(localization.onlyForMembers, <a href="http://login.com">{localization.login}</a>)
    // localization.formatString(localization.iAmText, <b>{localization.bold}</b>)

    this.setState({language});
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const {isAuthenticated} = this.props.auth;

    return (
      <div className="mb-3">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#link" target="_blank">Hegemony</Navbar.Brand>

          <Localize onSetLanguage={(language) => this.setLanguage(language)} />

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
                <button onClick={this.onLogoutClick} className="btn btn-outline-danger">Logout</button> :
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