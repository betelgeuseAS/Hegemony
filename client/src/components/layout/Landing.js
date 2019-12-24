import React from "react";
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import localization from "../localization/localization";

const Landing = () => {
  return (
    <Jumbotron>
      <h1>...</h1>
      <p>
        <Link to="/register">
          <button type="button" className="btn btn-outline-primary mr-4">{localization.sign_up}</button>
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-outline-secondary">{localization.sign_in}</button>
        </Link>
      </p>
    </Jumbotron>
  );
};

export default Landing;
