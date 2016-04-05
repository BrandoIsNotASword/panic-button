import React from 'react';
import L from 'leaflet';

/* eslint-disable */
import styles from '../../../node_modules/leaflet/dist/leaflet.css';
/* eslint-enable */

const { Component } = React;

class MapView extends Component {
  componentDidMount() {
    this.map = L.map('MapView').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 15,
      minZoom: 8
    }).addTo(this.map);
  }

  render() {
    return <div id="MapView" />;
  }
}

export default MapView;
