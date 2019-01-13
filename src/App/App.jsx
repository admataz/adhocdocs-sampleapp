import React, { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverBody } from 'reactstrap'

import FilterPanel from '../components/FilterPanel'
import DocumentList from '../components/DocumentList'
import DocumentView from '../components/DocumentView'

const App = () => {
  const [popoverOpen, setSearchPop] = useState(false)
  const toggleSearchPop = () => {
    setSearchPop(!popoverOpen)
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light m-0">
        <Link to="/content" className="btn btn-lg btn-outline-dark text-primary">
          <FontAwesomeIcon icon={['fas', 'hand-point-right']} className="mx-1" />
          filter:find
        </Link>

        <div className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <a
            id="searchButton"
            className="btn btn-outline-success my-2 my-sm-0"
            data-container="body"
            data-toggle="popover"
            data-placement="bottom"
            data-content="Search not active yet coming soon!"
          >
            Search
          </a>
          <Popover placement="bottom" isOpen={popoverOpen} target="searchButton" toggle={toggleSearchPop}>
            <PopoverBody>Coming Soon!</PopoverBody>
          </Popover>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <Route path="/content(/*)" component={DocumentList} />
            <Route path="/view/*" component={DocumentView} />
          </div>
          <div className="col-sm-6">
            <Route component={FilterPanel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
