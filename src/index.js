'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

/*-----------------------------------*/

import App from './app/containers/App';
import todoApp from './app/reducers';

/*-----------------------------------*/

import Html from './index.html'
import Style from './less/styles.less';

let store = createStore(todoApp);


render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root')
);