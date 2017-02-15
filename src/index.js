'use strict';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/*-----------------------------------*/

import App from './containers/App';
import todoApp from './reducers';

/*-----------------------------------*/

import Html from './index.html'
import Style from './less/styles.less';

let store = createStore(todoApp);

let rootElement = document.getElementById('root');
React.render(
  // Дочерний компонент должен быть обернуть в функцию
  // это баг в React 0.13.
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
);