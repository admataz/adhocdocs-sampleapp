import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import DocumentView from './DocumentView'
import { getCurrentDocument } from '../../store/selectors'
library.add(faTwitter, faFacebook, faGlobe)

const mapStateToProps = state => {
  return {
    document: getCurrentDocument(state),
  }
}
const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    closeDocument() {
      ownprops.history.goBack()
    },
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)
export default enhance(DocumentView)
