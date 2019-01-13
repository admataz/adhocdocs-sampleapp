import React from 'react'
import { Link } from 'react-router-dom'
const DocumentList = ({ filteredDocuments }) => (
  <div className="container m-4">
    <div className="list-group">
      {filteredDocuments.map(d => (
        <Link to={`/view/${d.schema}/${d.slug}`} key={d.slug} className="list-group-item list-group-item-action">
          {d.content.title}
        </Link>
      ))}
    </div>
  </div>
)

export default DocumentList
