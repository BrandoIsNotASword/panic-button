import React from 'react';
import { branch } from 'baobab-react/higher-order';

import FacebookButton from '../components/FacebookButton';

const { Component, PropTypes } = React;
const contextTypes = {
  router: PropTypes.object.isRequired
};

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleFacebookResponse() {
    this.context.router.push('/home');
  }

  render() {
    return (
      <div className="Login">
        <p className="Login__logo">SOS</p>
        <FacebookButton onFacebookResponse={this.handleFacebookResponse.bind(this)} />
      </div>
    );
  }
}

Login.contextTypes = contextTypes;

export default branch(Login, {
  cursors: {},
  actions: {}
});
