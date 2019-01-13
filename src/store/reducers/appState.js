import { uniq } from 'lodash'
import { APP_LOCATION_CHANGED } from '../actions/lib/constants'
const defaultAppState = {
  selectedFilters: [],
  selectedDocument: null,
}

const makeAppState = (state = defaultAppState, { type, payload }) => {
  const stateCopy = { ...state }
  switch (type) {
    case APP_LOCATION_CHANGED:
      const params = uniq(payload.split('/').filter(i => i))
      if (params[0] === 'content') {
        stateCopy.selectedFilters = params.splice(1)
      }

      if (params[0] === 'view') {
        stateCopy.selectedDocument = { schema: params[1], slug: params[2] }
      }

      return stateCopy
    default:
      return state
  }
}

export default makeAppState
