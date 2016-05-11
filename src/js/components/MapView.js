import React from 'react';
import L from 'leaflet';

import marker from '../../imgs/marker-icon.png';

/* eslint-disable */
import styles from '../../../node_modules/leaflet/dist/leaflet.css';
/* eslint-enable */

const { Component } = React;
const DUMMYLATLNG = [
  [51.50503625326346, -0.09002029895782471],
  [51.504341723551676, -0.08987009525299072],
  [51.50395772421477, -0.08924782276153564],
  [51.503910976248456, -0.08858263492584229]
];

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = { waypoints: [], aux: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(this.handleInterval.bind(this), 3000);
    this.map = L.map('MapView').setView([51.50503625326346, -0.09002029895782471], 13);
    this.marker = L.marker([51.50503625326346, -0.09002029895782471], {
      icon: L.icon({
        iconUrl: marker,
        iconAnchor: [12, 40]
      })
    });

    this.polyline = L.polyline = L.polyline([],
      { color: 'red' }
    );
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
      minZoom: 8
    }).addTo(this.map);

    this.marker.addTo(this.map);
    this.polyline.addTo(this.map);

    this.map.on('click', (e) => {
      console.log(e);
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleInterval() {
    const latLng = [DUMMYLATLNG[this.state.aux][0], DUMMYLATLNG[this.state.aux][1]];
    const waypoints = this.state.waypoints;

    this.map.panTo(latLng);
    this.marker.setLatLng(latLng);
    this.polyline.addLatLng(latLng);

    waypoints.push(DUMMYLATLNG[this.state.aux]);

    this.setState({ aux: this.state.aux + 1 });
  }

  render() {
    return <div id="MapView" />;
  }
}

export default MapView;
