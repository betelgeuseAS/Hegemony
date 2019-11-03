import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import config from "../../config/config";

class Weather extends Component {
  // get location
  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(successFunction);
  //   } else {
  //     alert("This browser doesn't support geolocation");
  //   }
  // }

  componentDidMount() {
    // TODO Write own proxy
    // Write own proxy for another API.
    // I have a proxy (not mine): https://cors-anywhere.herokuapp.com/
    // and this call is work: https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=8be3ec5012a405ec72cddb38fb5a9eb8
    // but just call weather API return CORS error: https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=8be3ec5012a405ec72cddb38fb5a9eb8
    // I need my proxy for resolution this problem.
    // axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=8be3ec5012a405ec72cddb38fb5a9eb8`)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // If I be call API in my API is like this:
    // axios.get(`/weather/current`)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // it is not solve problem, but rise a new problem.
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

Weather.propTypes = {};

export default Weather;
