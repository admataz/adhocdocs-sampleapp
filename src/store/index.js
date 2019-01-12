import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as actions from './actions'
import reducers from './reducers'
import * as selectors from './selectors'

let middleWare = compose(applyMiddleware(thunk))

if (window.devToolsExtension) {
  middleWare = compose(
    middleWare,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
const store = createStore(reducers, middleWare)

export {
  store,
  actions,
  reducers, 
  selectors
}

