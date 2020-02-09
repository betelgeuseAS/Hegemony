import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth";
import { store } from	'./store/configureStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from "moment";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/profile/Profile";
import Settings from "./components/profile/Settings";
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

// axios:
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status >= 400 && error.response.status < 500) {
    toast.error(`${localization.error}. ${localization.not_auth}`);
  } else if (error.response.status >= 500) {
    toast.error(`${localization.error}. ${localization.server_error}`);
  }
  return Promise.reject(error);
});

// toast:
// Call it once in your app. At the root of your app is the best place
toast.configure({
  autoClose: 3000,
  draggable: false,
  className: 'custom-toaster'
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

    this.setMomentLanguage(localization.getLanguage());
  };

  setMomentLanguage = (language) => {
    //See https://momentjs.com/docs/#/customization/
    moment.locale(language, {
      months : localization.date.months_long,
      monthsShort : localization.date.months_short,
      monthsParseExact : true,
      weekdays : localization.date.weekdays_long,
      weekdaysShort : localization.date.weekdays_short,
      weekdaysMin : localization.date.weekdays_min,
      weekdaysParseExact : true,
      longDateFormat : localization.date.moment.longDateFormat,
      calendar : localization.date.moment.calendar,
      relativeTime : localization.date.moment.relativeTime,
      dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
      ordinal : function (number, token) {
        let b = number % 10;
        let output = (~~ (number % 100 / 10) === 1) ? 'th' :
          (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
              (b === 3) ? 'rd' : 'th';
        return number + output;
      },
      meridiemParse : /PM|AM/,
      isPM : function (input) {
        return input.charAt(0) === 'A';
      },
      // In case the meridiem units are not separated around 12, then implement
      // this function (look at locale/id.js for an example).
      // meridiemHour : function (hour, meridiem) {
      //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
      // },
      meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? localization.date.moment.pm : localization.date.moment.am;
      },
      week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
      }
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Router>
              <div className="app">
                <NavBar componentLocalize={<Localize onSetLanguage={(language) => this.setLanguage(language)} />} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute exact path="/settings" component={Settings} />
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
