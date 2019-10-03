import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth";
import { store } from	'./store/configureStore';
import { toast } from 'react-toastify';

import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/profile/Profile";
import { Localize } from "./components/localization/Localize";

import './App.sass';

import localization from "./components/localization/localization";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

// toast:
// Call it once in your app. At the root of your app is the best place
toast.configure({
  autoClose: 3000,
  draggable: false
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ''
    };

    let language = localStorage.getItem('language');
    if (language) {
      localization.setLanguage(language);
    }
  }

  // Localization:
  setLanguage = (language) => {
    localization.setLanguage(language);
    this.setState({language});
    localStorage.setItem('language', language);

    // localization.getLanguage();
    // localization.getInterfaceLanguage();

    // localization.formatString(localization.currentDate, { //to format the passed string replacing its placeholders with the other arguments strings
    //   month: localization.january,
    //   day: 12,
    //   year: 2018
    // });
    // localization.formatString(localization.onlyForMembers, <a href="http://login.com">{localization.login}</a>)
    // localization.formatString(localization.iAmText, <b>{localization.bold}</b>)
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Router>
              <div className="App">
                <NavBar componentLocalize={<Localize onSetLanguage={(language) => this.setLanguage(language)} />} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
              </div>
            </Router>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;