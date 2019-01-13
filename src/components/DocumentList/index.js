import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getFilteredDocuments } from '../../store/selectors'

import DocumentList from './DocumentList'

const mapStateToProps = state => {
  return {
    filteredDocuments: getFilteredDocuments(state),
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    null
  )
)
export default enhance(DocumentList)
