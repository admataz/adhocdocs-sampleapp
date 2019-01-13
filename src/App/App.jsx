import React from 'react'

import FilterPanel from '../components/FilterPanel'
import DocumentList from '../components/DocumentList'

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">The finder</div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <DocumentList />
        </div>
        <div className="col-sm-6">
          <FilterPanel />
        </div>
      </div>
    </div>
  )
}

export default App
