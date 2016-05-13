/* eslint-disable */
import state from '../tree';
import request from 'superagent';

const cursor = state.select('home');

export function getWaypoints() {
  setActual();

  // cursor.set('waypoints', DUMMYWAYPOINTS);

  request
    .get('http://localhost:4000/api/v1/locations')
    .end((err, res) => {
      if (res.ok) {
      	if (res.body.data.length) {
	  const waypoints = res.body.data.map((waypoint) => {
            return [waypoint.latitude, waypoint.longitude]
          });

          cursor.set('waypoints', waypoints);
          cursor.set('actual', waypoints.length - 1);
	}
      }
    });
}


export function setActual() {
  cursor.set('actual', cursor.get('actual') + 1);
}
/* eslint-enable */

