import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Jumbotron, Form, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { updateSettings } from "../../actions/settings";
import localization from "../localization/localization";
import classnames from "classnames";
import {TypeAhead} from "../typeAhead/TypeAhead";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      tags: this.props.auth.user.tags,
      errors: {}
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setTags = (tags) => {
    this.setState({tags});
  };

  onSubmit = e => {
    e.preventDefault();
    const {name, tags} = this.state;
    const { auth: {user} } = this.props;

    user.name = name;
    user.tags = tags;

    this.props.updateSettings(user);
  };

  render() {
    const { auth: {user} } = this.props;
    const { name, tags, errors } = this.state;

    return (
      <Jumbotron>
        <Link to="/profile" className="pull-left">
          <button type="button" className="btn btn-outline-primary">
            <i className="fa fa-arrow-left mr-1" aria-hidden="true" />{localization.back}
          </button>
        </Link>

        <div>
          <h2>Settings</h2>
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
            <Form.Text className="text-muted">
              It's your own name.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <TypeAhead
              tags={tags}
              selects={tags}
              onSetTags={this.setTags}
            />
            <Form.Text className="text-muted">
              Tags for records and search records.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">{localization.save}</Button>
        </Form>
      </Jumbotron>
    );
  }
}

Settings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

Settings.defaultProps = {
  updateSettings: () => {},
  errors: {},
  auth: {},
};

const mapStateToProps = (store) => ({
  errors: store.errors,
  auth: store.auth,
});

const	mapDispatchToProps = dispatch	=> ({
  updateSettings: (data) => dispatch(updateSettings(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
