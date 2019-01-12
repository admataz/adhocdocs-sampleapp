import { CONFIG_LOADED } from '../actions/lib/constants'

const defaultState = {
  apiBaseUrl: '/api',
  settings: {
    endpoint: '/'
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONFIG_LOADED:
      return {...state, ...action.payload }
    default:
      return state
  }
}
