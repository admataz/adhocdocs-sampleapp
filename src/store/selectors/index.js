import { createSelector } from 'reselect'
import { intersection, groupBy, find, uniq, mapValues, sortBy } from 'lodash'

const selectedFilters = state => ({ topics: [], subtopics: [], regions: [], ...state.selectedFilters })
const selectedFiltersList = state => Object.values(state.selectedFilters).reduce((acc, arr) => [...acc, ...arr], [])
const selectedFiltersItems = state => (
  mapValues(
    selectedFilters(state),
    (selectedItems, filterName) => (
      selectedItems.map(selectedId => (
        find(filters(state)[filterName], { id: selectedId })
      )
      )
    )
  )
)
const filtered = state => {
  const selectedFilters = selectedFiltersList(state)
  if (!selectedFilters.length) {
    return []
  }
  return state.relationships
    .filter(r => r.r)
    .filter(itm => intersection([...selectedFilters], [...itm.r]).length === selectedFilters.length)
}
const filteredResults = state => (
  filtered(state)
    .map(itm => itm.id)
)
const filteredRelations = state => (
  uniq(
    filtered(state)
      .reduce((combined, itm) => [...combined, ...itm.r], [])))
const loadedDocumentIds = state => (
  state.documents
    .map(d => d.id)
) // TODO: - better fully loaded flag?
const unloadedResults = state => (
  [...filteredResults(state), ...filteredRelations(state)]
    .filter(id => !loadedDocumentIds(state).includes(id))
)
const filteredDocumentsList = state => (
  groupBy(
    filteredResults(state).map(id => find(state.documents, { id })),
    'schema_name'
  )
)
const relationships = state => state.relationships
const documentsBySchema = state => groupBy(sortBy(state.documents, 'content.title'), 'schema_name')
const filters = state => state.filters || []
const offlineOnly = state => state.config.offlineOnly || false
const topics = state => sortBy(filters(state).topics, 'title') || []
const regions = state => sortBy(filters(state).regions, 'title') || []
const subtopics = state => (
  [...sortBy(filters(state).subtopics, 'title') || []]
    .filter(({ related }) => {
      const selectedFilters = selectedFiltersList(state)
      return intersection(related, [...selectedFilters]).length
    }
    )
)
const expertsGrouped = state => []
const byId = state => id => find(state.documents, { id })
const recaptchaKey = state => state.config.recaptchaKey || false

export  {
  selectedFiltersList,
  filtered,
  filteredResults,
  unloadedResults,
  filteredDocumentsList,
  relationships,
  filteredRelations,
  subtopics,
  offlineOnly,
  selectedFilters,
  selectedFiltersItems,
  filters,
  topics,
  regions,
  documentsBySchema,
  byId,
  recaptchaKey,
  expertsGrouped
}

// ------------------
// const getCurrentSchemaName = state => state.app.schema
// const getCurrentItemId = state => state.app.itemId
// const getCurrentAppView = state => state.app.view
// const getCollections = state => state.data.collections
// const getSchemas = state => state.data.schema
// const getPureSchemas = state => state.data.pureschema

// export const getCurrentCollection = createSelector(
//   [getCollections, getCurrentSchemaName],
//   (collections, schema) => collections[schema]
// )

// export const getCurrentView = createSelector(
//   [getCurrentAppView],
//   view => view
// )

// export const getCurrentItem = createSelector(
//   [getCurrentCollection, getCurrentItemId],
//   (collection = {}, id = null) => collection[id]
// )

// export const getCurrentSchema = createSelector(
//   [getCurrentSchemaName, getSchemas],
//   (schemaName, schemas) => schemas[schemaName] || null
// )

// export const getPureSchema = createSelector(
//   [getCurrentSchemaName, getPureSchemas],
//   (schemaName, pureschema) => pureschema[schemaName]
// )

export const getConfigEndpoint = state => console.log(state) || state.config.settings.endpoint
export const getConfigNoncense = state => state.config.settings.noncense



