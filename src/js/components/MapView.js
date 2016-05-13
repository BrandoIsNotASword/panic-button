import React from 'react';
import L from 'leaflet';

import marker from '../../imgs/marker-icon.png';

/* eslint-disable */
import styles from '../../../node_modules/leaflet/dist/leaflet.css';
/* eslint-enable */

const { PropTypes, Component } = React;
const propTypes = {
  waypoints: PropTypes.array
};

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = L.map('MapView').setView([51.5050362, -0.0900202], 13);
    this.marker = L.marker([51.5050362, -0.0900202], {
      icon: L.icon({
        iconUrl: marker,
        iconAnchor: [13, 38]
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

    /* eslint-disable */
    this.map.on('click', (e) => {
      console.log(e);
    });
    /* eslint-enable */
  }

  componentDidUpdate() {
    if (!this.props.waypoints.length) return;

    const { waypoints } = this.props;
    const waypointsLength = waypoints.length - 1;
    const latLng = [waypoints[waypointsLength][0], waypoints[waypointsLength][1]];

    this.map.panTo(latLng);
    this.marker.setLatLng(latLng);
    this.polyline.setLatLngs(waypoints);
  }

  render() {
    return <div id="MapView" />;
  }
}

MapView.propTypes = propTypes;

export default MapView;
