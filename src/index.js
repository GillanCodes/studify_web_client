import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import App from './App';

import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { getSheets } from './action/sheets.action';
import { getUsers } from './action/users.action';
import { getAnswers, getQuizz } from './action/quizz.action';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getSheets());
store.dispatch(getQuizz());
store.dispatch(getUsers());
store.dispatch(getAnswers());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
