import { createSelector } from 'reselect'
// import { intersection, groupBy, find, uniq, mapValues, sortBy } from 'lodash'

const getConfig = state => state.config
export const getConfigApiBaseUrl = createSelector([getConfig], ({apiBaseUrl}) => apiBaseUrl)
export const getConfigFilterNames = createSelector([getConfig], ({filters}) => filters)
export const getConfigDocumentNames = createSelector([getConfig], ({documents}) => documents)



/*
const filtered = state => {
  const selectedFilters = selectedFiltersList(state)
  if (!selectedFilters.length) {
    return []
  }
  return state.relationships
    .filter(r => r.r)
    .filter(itm => intersection([...selectedFilters], [...itm.r]).length === selectedFilters.length)
}

const documentsBySchema = state => groupBy(sortBy(state.documents, 'content.title'), 'schema_name')

const filters = state => state.filters || []
const byId = state => id => find(state.documents, { id })
*/

