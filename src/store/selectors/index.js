import { createSelector } from 'reselect'
// import { intersection, groupBy, find, uniq, mapValues, sortBy } from 'lodash'
import { find, groupBy, intersection, sortBy } from 'lodash'

export const getConfig = state => state.config
export const getConfigApiBaseUrl = createSelector(
  [getConfig],
  ({ apiBaseUrl }) => apiBaseUrl
)
export const getConfigFilterNames = createSelector(
  [getConfig],
  ({ filters }) => filters
)
export const getConfigDocumentNames = createSelector(
  [getConfig],
  ({ documents }) => documents
)

export const getConfigRelatedNames = createSelector(
  [getConfig],
  ({ related }) => related
)

export const getAllData = state => state.data

export const getAllFilters = createSelector(
  [getAllData],
  ({ filters }) => sortBy(filters, 'content.title')
)

export const getGroupedFilters = createSelector(
  [getAllFilters],
  filters => groupBy(filters, 'schema')
)

export const getAppData = state => state.app

export const getSelectedFilters = createSelector(
  [getAppData],
  ({ selectedFilters }) => selectedFilters
)

export const getSelectedDocument = createSelector(
  [getAppData],
  ({ selectedDocument }) => selectedDocument
)

export const getAllDocuments = createSelector(
  [getAllData],
  ({ documents }) => documents
)

export const getCurrentDocument = createSelector(
  [getAllDocuments, getSelectedDocument],
  (documents, { schema, slug }) => find(documents, { schema, slug })
)

export const getFilteredDocuments = createSelector(
  [getSelectedFilters, getConfigDocumentNames, getConfigFilterNames, getAllDocuments],
  (selectedFilters, documentNames, filterNames, documents) => {
    if (!selectedFilters.length) {
      return []
    }
    return documents
      .filter(d => documentNames.map(dn => dn.id).includes(d.schema))
      .filter(d => {
        const documentRelations = filterNames.reduce((acc, curr) => [...acc, ...d.related[curr.id]], [])
        return intersection(selectedFilters, documentRelations).length === selectedFilters.length
      })
  }
)

export const getAvailableFilters = createSelector(
  [getFilteredDocuments, getConfigFilterNames],
  (documents, filterNames) =>
    documents.reduce((allFilters, d) => {
      const docFilters = filterNames.reduce((acc, curr) => [...acc, ...d.related[curr.id]], [])
      return [...allFilters, ...docFilters]
    }, [])
)
