import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
import App from './containers/Starvis';
import rootReducer from './reducers/rootReducer';
import { nextImg } from './actions/restActions';
import { fetchPostsIfNeeded } from './actions/weatherActions';

const initState = {
  selectedCity: 'hangzhou',
  cityInfo: {
    didInvalidate: false,
    now: {},
    receivedAt: 0
  },
  roomsInfo: window.roomsInfo,
  imgsInfo: {
    imgLength: 10,
    currentImg: 0
  }
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
  store.dispatch(nextImg());
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
