import state from '../tree';
import request from 'superagent';

const cursor = state.select('home');

export function getWaypoints(tree, { user, pannic }) {
  request
    .get('http://iron_api.reepsy.com/api/v1/locations')
    .end((err, res) => {
      if (res.ok) {
        if (res.body.data.length) {
          const waypoints = arrayFiltered(res.body.data, user, pannic);
          cursor.set('waypoints', getLatLng(waypoints));
        }
      }
    });
}

export function arrayFiltered(arr, user, pannic) {
  return arr.filter((element) => {
    if (user === element.user && pannic === element.pannic) {
      return true;
    }
  });
}

export function getLatLng(arr) {
  return arr.map((element) => {
    return arrayStrToFloat([element.latitude, element.longitude]);
  });
}

export function arrayStrToFloat(arr) {
  return arr.map((element) => parseFloat(element));
}
