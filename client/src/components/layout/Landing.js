import React from "react";
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';

const Landing = () => {
  return (
    <Jumbotron>
      <h1>Welcome</h1>
      <p>
        <Link to="/register">
          <button type="button" className="btn btn-outline-primary mr-4">Register</button>
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-outline-secondary">Log In</button>
        </Link>
      </p>
    </Jumbotron>
  );
};

export default Landing;