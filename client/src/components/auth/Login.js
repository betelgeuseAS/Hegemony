import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;

    const userData = {
      email,
      password
    };

    this.props.loginUser(userData);
  };

  render() {
    const {email, password, errors} = this.state;

    return (
      <Jumbotron>
        <Link to="/" className="pull-left">
          <button type="button" className="btn btn-outline-primary">
            <i className="fa fa-arrow-left mr-1" aria-hidden="true" />Back
          </button>
        </Link>

        <div>
          <h4><b>Login</b> below</h4>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>

        <Form noValidate onSubmit={this.onSubmit} className="text-left">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.onChange}
              value={email}
              error={errors.email}
              name="email"
              className={classnames("", {
                'is-invalid': errors.email || errors.emailnotfound
              })}/>
            <span className="invalid-feedback">{errors.email}{errors.emailnotfound}</span>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={this.onChange}
              value={password}
              error={errors.password}
              name="password"
              className={classnames("", {
                'is-invalid': errors.password || errors.passwordincorrect
              })}/>
            <span className="invalid-feedback">{errors.password}{errors.passwordincorrect}</span>
          </Form.Group>

          <Button variant="primary" type="submit">Login</Button>
        </Form>
      </Jumbotron>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);