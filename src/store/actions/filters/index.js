import { createAction } from 'redux-actions'
import axios from 'axios'
import { getConfigApiBaseUrl, getConfigFilterNames } from '../../selectors'

import { REQUEST_FILTER_DOCUMENTS, RECEIVE_FILTER_DOCUMENTS, SET_FILTER_SELECTION } from '../lib/constants'

const startRequest = createAction(REQUEST_FILTER_DOCUMENTS)
const requestDone = createAction(RECEIVE_FILTER_DOCUMENTS)

export const setFilterSelection = createAction(SET_FILTER_SELECTION)

export const fetchFilters = () => async (dispatch, getState) => {
  const state = getState()
  const path = getConfigApiBaseUrl(state)

  dispatch(startRequest(path))
  try {
    const filterNames = getConfigFilterNames(state)
    const results = await Promise.all(filterNames.map(f => axios.get(`${path}/${f.path}`)))
    const data = results.reduce((acc, curr) => [...acc, ...curr.data], [])
    return dispatch(requestDone(data))
  } catch (error) {
    console.log(error)
  }
}
