import React from 'react';
import { branch } from 'baobab-react/higher-order';

const { Component } = React;

class Main extends Component {
  render() {
    return this.props.children;
  }
}

export default branch(Main, {
  cursors: {},
  actions: {}
});
