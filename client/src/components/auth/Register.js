import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Jumbotron, Form, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {name, email, password, password2} = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {name, email, password, password2, errors} = this.state;

    return (
      <Jumbotron>
        <Link to="/" className="pull-left">
          <button type="button" className="btn btn-outline-primary">
            <i className="fa fa-arrow-left mr-1" aria-hidden="true" />Back
          </button>
        </Link>

        <div>
          <h4><b>Register</b> below</h4>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>

        <Form noValidate onSubmit={this.onSubmit} className="text-left">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={this.onChange}
              value={name}
              error={errors.name}
              name="name"
              className={classnames("", {
                'is-invalid': errors.name
              })}/>
            <span className="invalid-feedback">{errors.name}</span>
          </Form.Group>

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
                'is-invalid': errors.email
              })}/>
            <span className="invalid-feedback">{errors.email}</span>
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
                'is-invalid': errors.password
              })}/>
            <span className="invalid-feedback">{errors.password}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={this.onChange}
              value={password2}
              error={errors.password2}
              name="password2"
              className={classnames("", {
                'is-invalid': errors.password2
              })}/>
            <span className="invalid-feedback">{errors.password2}</span>
          </Form.Group>

          <Button variant="primary" type="submit">Sign up</Button>
        </Form>
      </Jumbotron>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// const	mapStateToProps	=	store	=> {
//   return {
//     auth: store.auth
//   }
// };

// const	mapDispatchToProps = dispatch	=> {
//   return {
//     logoutUser: () => dispatch(logoutUser())
//   }
// };
// const	mapDispatchToProps = dispatch	=> ({
//   logoutUser: () => dispatch(logoutUser())
// });

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));