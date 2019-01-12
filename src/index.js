import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import {store, actions} from './store'
import * as serviceWorker from './serviceWorker';

async function init(){
  await store.dispatch(actions.configLoaded())
  // await store.dispatch(actions.fetchAllSchema())
  render(<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'))
}

init()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
