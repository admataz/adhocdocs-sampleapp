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
      stateCopy.selectedFilters = uniq(payload.split('/').filter(i => i))
      return stateCopy
    default:
      return state
  }
}

export default makeAppState
