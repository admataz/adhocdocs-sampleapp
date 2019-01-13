import React from 'react'
import DocumentItem from '../DocumentItem'
const DocumentList = ({ filteredDocuments }) => (
  <div className="container">
    <h3>Results</h3>
    <ul>
      {filteredDocuments.map(d => (
        <li>
          <DocumentItem key={d.slug} document={d} />
        </li>
      ))}
    </ul>
  </div>
)

export default DocumentList
