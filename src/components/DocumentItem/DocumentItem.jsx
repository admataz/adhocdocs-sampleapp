import React from 'react'
import { Link } from 'react-router-dom'
const DocumentItem = ({ document }) => (
  <div className="container">
    <Link to={`/view/${document.schema}/${document.slug}`}>{document.content.title}</Link>
  </div>
)

export default DocumentItem
