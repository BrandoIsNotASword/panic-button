import React from 'react';
import { branch } from 'baobab-react/higher-order';

import MapView from '../components/MapView';

const { Component } = React;

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <MapView />
      </div>
    );
  }
}

export default branch(Home, {
  cursors: {},
  actions: {}
});
