import React from 'react';
import { branch } from 'baobab-react/higher-order';

import MapView from '../components/MapView';

import * as HomeActions from '../actions/HomeActions';

const { Component } = React;

class Home extends Component {
  constructor(props) {
    super(props);

    this.actions = { ...this.props.actions };
  }

  componentDidMount() {
    this.actions.getWaypoints();
    this.timer = setInterval(this.handleInterval.bind(this), 3000);
  }

  handleInterval() {
    this.actions.getWaypoints();
  }

  render() {
    return (
      <div className="Home">
        <MapView waypoints={this.props.waypoints} />
      </div>
    );
  }
}

export default branch(Home, {
  cursors: {
    waypoints: ['home', 'waypoints'],
    actual: ['home', 'actual']
  },
  actions: { ...HomeActions }
});
