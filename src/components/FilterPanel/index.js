import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { getGroupedFilters, getConfigFilterNames, getSelectedFilters, getAvailableFilters } from '../../store/selectors'

import FilterPanel from './FilterPanel'

const mapStateToProps = (state, { match: { params } }) => {
  return {
    groupedTags: getGroupedFilters(state),
    availableTags: getAvailableFilters(state),
    availableTaxonomies: getConfigFilterNames(state),
    selectedTags: getSelectedFilters(state),
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)
export default enhance(FilterPanel)
