import React, { Component } from 'react';
import "./CustomToggle.sass";
import calendar from "../../../img/control/calendar.svg";

class CustomToggle extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <span className="calendar" onClick={this.handleClick}>
        <img src={calendar} alt="calendar" />
      </span>
    );
  }
}

export default CustomToggle;
