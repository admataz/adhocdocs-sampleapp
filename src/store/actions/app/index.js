import { createAction } from 'redux-actions'
import axios from 'axios'

import { CONFIG_LOADED, APP_STATE_CHANGED, REQUEST_CONFIG, APP_LOCATION_CHANGED } from '../lib/constants'

export const requestConfig = createAction(REQUEST_CONFIG)
export const configLoaded = createAction(CONFIG_LOADED)
export const setAppState = createAction(APP_STATE_CHANGED)
export const appLocationChanged = createAction(APP_LOCATION_CHANGED)

export const fetchConfig = path => async (dispatch, getState) => {
  dispatch(requestConfig(path))
  try {
    const { data } = await axios.get(path)
    return dispatch(configLoaded(data))
  } catch (error) {
    console.log(error)
  }
}
