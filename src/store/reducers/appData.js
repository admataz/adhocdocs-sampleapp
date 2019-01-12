
import {
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_FILTER_DOCUMENTS,
} from '../actions/lib/constants'

export const documents = (state = {}, {type, payload}) => {
  switch(type){
    case RECEIVE_ALL_DOCUMENTS:
    const stateCopy = {}
    payload.forEach(s => {
      stateCopy[s.schema] = [...(stateCopy[s.schema] || []), s]
    })
    return stateCopy
  default:
    return state
  }
}

export const availableFilters = (state = {}, {type, payload}) => {
  switch(type){
    case RECEIVE_FILTER_DOCUMENTS: 
    const stateCopy = {}
    payload.forEach(s => {
      stateCopy[s.schema] = [...(stateCopy[s.schema] || []), s]
    })
    return stateCopy
    default: 
    return state
  }
}


export default (state = {}, action) => ({
  filters: availableFilters(state.filters, action),
  documents: documents(state.documents, action),
})

