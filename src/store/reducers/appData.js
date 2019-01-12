import { keyBy } from 'lodash'
import { find, findIndex, mapValues, toNumber, kebabCase } from 'lodash'
import {filters} from '../selectors'

import {
  REQUEST_ITEMLIST,
  RECEIVE_ITEMLIST,
  RECEIVE_ITEMSCHEMA,
  REQUEST_ITEMSCHEMA,
  RECEIVE_ALLSCHEMA,
  REQUEST_ALLSCHEMA,
  RECEIVE_ITEM,
  RECEIVE_PURE_SCHEMA,
  RECEIVE_DOCUMENTS_DETAIL,
  RECEIVE_ALL_DOCUMENTS,
  RECEIVE_FILTER_DOCUMENTS,
  SET_FILTER_SELECTION,
  RECEIVE_DOCUMENTS_RELATIONS
} from '../actions/lib/constants'

export const collections = (state = {}, action) => {
  // immutability! - copy the relevant state and collection before operating on it and returning it (or props won't update!)
  const stateCopy = { ...state }
  switch (action.type) {
    case REQUEST_ITEMLIST:
      stateCopy[action.schema] = {}
      return stateCopy
    case RECEIVE_ITEMLIST:
      stateCopy[action.schema] = keyBy(action.payload.data, 'id')
      return stateCopy
    case RECEIVE_ITEM:
    default:
      return state
  }
}

export const schema = (state = {}, action) => {
  let stateCopy = { ...state }
  switch (action.type) {
    case REQUEST_ITEMSCHEMA:
      stateCopy[action.schema] = null
      return stateCopy
    case RECEIVE_ITEMSCHEMA:
      stateCopy[action.schema] = action.payload
      return stateCopy
    case REQUEST_ALLSCHEMA:
      return {}
    case RECEIVE_ALLSCHEMA:
      return keyBy(action.payload.data, 'name')
    default:
      return state
  }
}

export const pureschema = (state = {}, action) => {
  let stateCopy = { ...state }
  switch (action.type) {
    case RECEIVE_PURE_SCHEMA:
      stateCopy[action.schema] = action.payload
      return stateCopy
    default:
      return state
  }
}

// TOD: remove mutationss here
const updateDocs = (state, payload) => {
  payload.data.forEach(doc => {
    const index = findIndex(state.documents, {
      id: doc.id
    })
    if (doc.c) {
      doc.content = doc.c
    }
    doc.slug = kebabCase(doc.content.title)
    if (index === -1) {
      state.documents.push(doc)
    } else {
      state.documents.splice(index, 1, doc)
    }
  })
}


export const documents = (state = {}, {type, payload}) => {
  switch(type){
    case RECEIVE_DOCUMENTS_DETAIL:
    case RECEIVE_ALL_DOCUMENTS:
    return updateDocs(state, payload)
  default:
    return state
  }
}

export const availableFilters = (state = {}, {type, payload}) => {
  switch(type){
    case RECEIVE_FILTER_DOCUMENTS: 
    const stateCopy = {}
    for (let s of payload.schema) {
      stateCopy[s] = payload.schema[s].map(f => ({ ...f, slug: kebabCase(f.title) }))
    }
    return stateCopy
    default: 
    return state
  }
}


export const selectedFilters  = (state = {}, {type, payload}) => {
  switch(type){
    case SET_FILTER_SELECTION: 
    return mapValues(payload, (a, type) => {
      const selected = a ? a.split(',') : []
      return selected.map(s => {
        // TODO: check this selector - the state is scoped incorrectly 
        const item = find(filters(state)[type], { slug: s })
        if (item) {
          return toNumber(item.id)
        }
        return null
      }).filter(item => item)
      })

      default: 
      return state
  }
}


export const relationships = (state = {}, {type, payload}) => {
  switch (type){
    case RECEIVE_DOCUMENTS_RELATIONS:
      return payload.data
    default: 
      return state
  }
}

export default (state = {}, action) => ({
  collections: collections(state.collections, action),
  schema: schema(state.schema, action),
  pureschema: pureschema(state.pureschema, action),
  filters: availableFilters(state.filters, action),
  relationships: relationships(state.relationships, action),
  selectedFilters: selectedFilters(state.selectedFilters, action),
  documents: documents(state.documents, action),
})

