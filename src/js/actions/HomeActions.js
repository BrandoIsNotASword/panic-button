import state from '../tree';
import request from 'superagent';

const cursor = state.select('home');

const DUMMYWAYPOINTS = [
  [51.50503625326346, -0.09002029895782471],
  [51.504341723551676, -0.08987009525299072],
  [51.50395772421477, -0.08924782276153564],
  [51.503910976248456, -0.08858263492584229]
];

export function getWaypoints() {
  setActual();

  cursor.set('waypoints', DUMMYWAYPOINTS);

  /* request
    .get('')
    .end((err, res) => {
      if (res.ok) {
        cursor.set('waypoints', res.body.waypoints);
        cursor.set('actual', res.body.waypoints.length - 1);
      }
    }); */
}

export function setActual() {
  cursor.set('actual', cursor.get('actual') + 1);
}
