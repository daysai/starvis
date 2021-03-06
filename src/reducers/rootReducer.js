import { combineReducers } from 'redux';
import { MODIFY_ROOMINFO } from '../actions/restActions';
import {
  SELECT_CITY,
  INVALIDATE_WEATHER,
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../actions/weatherActions';
import { roomsInfoName } from '../constants';

function roomsInfo(state = [{}, {}], action) {
  let newState;
  switch (action.type) {
    case MODIFY_ROOMINFO:
      newState = state.map((room, index) => {
        if (index === action.index) {
          return Object.assign({}, room, {
            roomType: action.roomType,
            price: action.price,
            vip: action.vip
          });
        }
        return room;
      });
      try {
        window.localStorage.setItem(roomsInfoName, JSON.stringify(newState));
      } catch (e) {
        console.log(e);
      }
      return newState;
    default:
      return state;
  }
}

function selectedCity(state = 'hangzhou', action) {
  switch (action.type) {
    case SELECT_CITY:
      return action.city;
    default:
      return state;
  }
}

function cityInfo(
  state = {
    didInvalidate: false,
    now: {},
    receivedAt: ''
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_WEATHER:
      return Object.assign({}, state, {
        didInvalidate: action.didInvalidate
      });
    case REQUEST_WEATHER:
      return Object.assign({}, state, {
        status: action.status,
        didInvalidate: action.didInvalidate
      });
    case RECEIVE_WEATHER:
      return Object.assign({}, state, {
        status: action.status,
        now: action.now,
        city: action.city,
        dailyTmp: action.dailyTmp,
        suggestion: action.suggestion,
        receivedAt: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  roomsInfo,
  selectedCity,
  cityInfo
});

export default rootReducer;
