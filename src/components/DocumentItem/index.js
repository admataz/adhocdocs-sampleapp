import { connect } from 'react-redux'
import { compose } from 'recompose'
// import { getFilteredDocuments } from '../../store/selectors'

import DocumentItem from './DocumentItem'

// const mapStateToProps = state => {
//   return {
//     filteredDocuments: getFilteredDocuments(state),
//   }
// }

const enhance = compose(connect())
export default enhance(DocumentItem)
