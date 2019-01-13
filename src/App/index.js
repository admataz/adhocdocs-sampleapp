import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faListAlt, faHandPointRight } from '@fortawesome/free-solid-svg-icons'
import App from './App'

library.add(faListAlt, faHandPointRight)

const enhance = compose(
  withRouter,
  connect(
    null,
    null
  )
)
export default enhance(App)
