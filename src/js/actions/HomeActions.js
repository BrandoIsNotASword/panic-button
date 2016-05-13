import state from '../tree';
import request from 'superagent';

const cursor = state.select('home');

export function getWaypoints(tree, user) {
  request
    .get('http://iron_api.reepsy.com/api/v1/locations')
    .end((err, res) => {
      if (res.ok) {
        if (res.body.data.length) {
          const waypoints =
            arrayFiltered(res.body.data, user, cursor.get('selectedSession'));

          cursor.set('data', res.body.data);
          cursor.set('waypoints', getLatLng(waypoints));
        }
      }
    });
}

export function setDropdown(tree, dropdown) {
  cursor.set('dropdown', dropdown);
}

export function setSelectedSession(tree, selectedSession) {
  cursor.set('selectedSession', selectedSession);
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
