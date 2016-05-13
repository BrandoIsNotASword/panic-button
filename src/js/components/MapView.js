import React from 'react';
import L from 'leaflet';

import marker from '../../imgs/marker-icon.png';

/* eslint-disable */
import styles from '../../../node_modules/leaflet/dist/leaflet.css';
/* eslint-enable */

const { PropTypes, Component } = React;
const propTypes = {
  waypoints: PropTypes.array,
  actual: PropTypes.number
};

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = { waypoints: [], aux: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(this.handleInterval.bind(this), 3000);
    this.map = L.map('MapView').setView([51.5050362, -0.0900202], 13);
    this.marker = L.marker([51.5050362, -0.0900202], {
      icon: L.icon({
        iconUrl: marker,
	iconAnchor: [12, 35]
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleInterval() {
    const { waypoints } = this.props;
    const latLng = [waypoints[this.state.aux][0], waypoints[this.state.aux][1]];
    // const latLng = [waypoints[this.props.actual][0], waypoints[this.props.actual][1]];

    this.map.panTo(latLng);
    this.marker.setLatLng(latLng);
    this.polyline.addLatLng(latLng);

    this.setState({ aux: this.state.aux + 1 });
  }

  render() {
    return <div id="MapView" />;
  }
}

MapView.propTypes = propTypes;

export default MapView;
