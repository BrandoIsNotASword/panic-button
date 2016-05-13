import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
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
    this.actions.setSelectedSession(this.props.location.query.pannic);
    this.actions.getWaypoints(this.props.location.query.user);
    this.timer = setInterval(this.handleInterval.bind(this), 3000);
  }

  handleInterval() {
    this.actions.getWaypoints(this.props.location.query.user);
  }

  handleClickDropdown() {
    this.actions.setDropdown(!this.props.dropdown);
  }

  handleClickSession(session) {
    this.actions.setDropdown(false);
    this.actions.setSelectedSession(session);
  }

  renderSessions() {
    if (!this.props.data.length) return;

    const sessions = [];

    this.props.data.map((element) => {
      if (sessions.indexOf(element.pannic) === -1) {
        sessions.push(element.pannic);
      }
    });

    return sessions.map((session, key) => {
      const time = this.props.data.filter((element) => element.pannic === session)[0].created_at;

      return (
        <li
          key={key}
          className={classNames('Home__session', {
            'Home__session--selected': this.props.selectedSession === session
          })}
          onClick={this.handleClickSession.bind(this, session)}
        >
          {moment(time, moment.ISO_8601).format('HH:mm')}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="Home">
        <div className="Home__sessions">
          <div
            className="Home__dropdown"
            onClick={this.handleClickDropdown.bind(this)}
          >
            {!this.props.dropdown ? 'VER SESIONES' : 'CERRAR'}
          </div>
          <ul className={classNames('Home__listSessions', {
            'Home__listSessions--open': this.props.dropdown
          })}
          >
            {this.renderSessions()}
          </ul>
        </div>
        <MapView
          waypoints={this.props.waypoints}
        />
      </div>
    );
  }
}

export default branch(Home, {
  cursors: {
    data: ['home', 'data'],
    waypoints: ['home', 'waypoints'],
    dropdown: ['home', 'dropdown'],
    selectedSession: ['home', 'selectedSession']
  },
  actions: { ...HomeActions }
});
