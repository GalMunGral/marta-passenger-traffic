import fetch from 'isomorphic-fetch';
import { showErrorMessage } from './error';
import { BASE_URL } from './.config';

export function requestStationData() {
  return { type: "REQUEST_STATION_DATA" };
}

export function receiveStationData(json) {
  return { type: "RECEIVE_STATION_DATA", json };
}

export function fetchStations(order) {
  return (dispatch) => {
    dispatch(requestStationData());
    return fetch(
      `//${BASE_URL}/api/stations?attr=${order ? order.attr : null}&asc=${order ? order.asc : null}`
    )
      .then(res => res.json())
      .then((json) => {
         console.log(json)
        if (json.err) {
          dispatch(showErrorMessage(json.err, 0));
        } else {
          dispatch(receiveStationData(json.results));
        }
      });
  };
}