import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import {store, actions} from './store'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

async function init(){
  const configUrl = process.env.REACT_APP_CONFIG_URL || '/client-config.json'
  
  await store.dispatch(actions.fetchConfig(configUrl))
  await store.dispatch(actions.fetchFilters())
  await store.dispatch(actions.fetchAllDocuments())
  
  render(<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'))
}

init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
