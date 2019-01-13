import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'

import App from './App'

const enhance = compose(
  connect(
    null,
    null
  ),
  withRouter
)
export default enhance(App)
