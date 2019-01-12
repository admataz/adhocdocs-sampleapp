import { APP_STATE_CHANGED } from '../actions/lib/constants'
const defaultAppState = {
  selectedFilters: [],
  selectedDocument: null
}

const makeAppState = (state = defaultAppState, action) => {
  const stateCopy = { ...state }
  switch (action.type) {
    case APP_STATE_CHANGED:
      return stateCopy
    default:
      return state
  }
}

export default makeAppState
