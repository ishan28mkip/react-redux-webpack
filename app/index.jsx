import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import App from './components/App';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

let container = document.createElement('div');
document.body.appendChild(container);

const render = () => {
	ReactDOM.render(
		<Provider store = { createStore(reducers) }>
			<App />
		</Provider>,
		container
	);
}

render();