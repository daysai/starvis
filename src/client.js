import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
import App from './containers/Starvis';
import rootReducer from './reducers/rootReducer';
import { fetchPostsIfNeeded } from './actions/weatherActions';
import { roomsInfoName } from './constants';

let oldRoomsInfo;
try {
  const info = window.localStorage.getItem(roomsInfoName);
  oldRoomsInfo = info ? JSON.parse(info) : undefined;
} catch (e) {
  console.log(e);
}

const initState = {
  selectedCity: 'hangzhou',
  cityInfo: {
    didInvalidate: false,
    now: {},
    receivedAt: 0
  },
  roomsInfo: oldRoomsInfo || [
    {
      roomType: '主题房',
      price: 208,
      vip: 188
    },
    {
      roomType: '家庭套房',
      price: 188,
      vip: 168
    },
    {
      roomType: '商务大床房',
      price: 158,
      vip: 138
    },
    {
      roomType: '商务标间',
      price: 158,
      vip: 138
    },
    {
      roomType: '舒适标间',
      price: 128,
      vip: 118
    },
    {
      roomType: '限量大床',
      price: 118,
      vip: 108
    },
    {
      roomType: '温馨大床房',
      price: 106,
      vip: 96
    }
  ]
};

const store = createStore(
  rootReducer,
  initState,
  applyMiddleware(
    thunkMiddleware
    // logger
  )
);

store.dispatch(fetchPostsIfNeeded()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
});

setInterval(() => {
  const nowTime = Date.now();
  const lastFetch = store.getState().cityInfo.receivedAt;
  if (nowTime - lastFetch > 1800000) {
    store.dispatch(fetchPostsIfNeeded());
  }
}, 3000);
if (module.hot) {
  module.hot.accept('./containers/Starvis', () => {
    const NextApp = require('./containers/Starvis').default; // eslint-disable-line global-require
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('app')
    );
  });
}
