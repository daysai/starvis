import fetch from 'isomorphic-fetch';

export const SELECT_CITY = 'SELECT_CITY';
export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const INVALIDATE_WEATHER = 'INVALIDATE_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';

const MyKey = 'c0b3703351a444d4bda8bfb37715e350';

export function seletCity(city) {
  return {
    type: SELECT_CITY,
    city
  };
}

export function requestWeather() {
  return {
    type: REQUEST_WEATHER,
    status: 'isFetching',
    didInvalidate: false
  };
}

export function invalidateWeather() {
  return {
    type: INVALIDATE_WEATHER,
    didInvalidate: true
  };
}

export function receiveWeather(json) {
  const { now, suggestion, status, basic, daily_forecast } = json.HeWeather5[0];
  return {
    type: RECEIVE_WEATHER,
    now,
    city: basic.city,
    dailyTmp: daily_forecast[0].tmp,
    suggestion,
    status,
    receivedAt: Date.now()
  };
}

export function fetchWeather(city) {
  return (dispatch) => {
    dispatch(requestWeather());
    return fetch(`https://free-api.heweather.com/v5/weather?city=${city}&key=${MyKey}`)
      .then(response => response.json())
      .then(json => dispatch(receiveWeather(json)));
  };
}

function shouldFetchWeather(state) {
  const status = state.status;
  if (!status) {
    return true;
  } else if (status === 'isFetching') {
    return false;
  }
  return state.didInvalidate;
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) =>
    shouldFetchWeather(getState()) && dispatch(fetchWeather(getState().selectedCity));
}

// https://free-api.heweather.com/v5/now?city=hangzhou&key=c0b3703351a444d4bda8bfb37715e350
