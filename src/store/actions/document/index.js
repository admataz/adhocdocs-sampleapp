import {createAction} from 'redux-actions'
import axios from 'axios'
import { getConfigApiBaseUrl, getConfigDocumentNames } from '../../selectors'


import {REQUEST_ALL_DOCUMENTS, RECEIVE_ALL_DOCUMENTS } from '../lib/constants'


const startRequest = createAction(REQUEST_ALL_DOCUMENTS)
const requestDone = createAction(RECEIVE_ALL_DOCUMENTS)


export const fetchAllDocuments = () => async (dispatch, getState) => {
  const state = getState()
  const path = getConfigApiBaseUrl(state)

  dispatch(startRequest(path))
  try {
    const documentNames = getConfigDocumentNames(state)
    const results = await Promise.all(documentNames.map(f => axios.get(`${path}/${f.path}`)))
    const data = results.reduce( (acc, curr) => [...acc, ...curr.data], [] )
    return dispatch(requestDone(data))
  } catch (error) {
    console.log(error)  
  }
  
}