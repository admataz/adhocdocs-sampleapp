import React from 'react'
import { Link } from 'react-router-dom'

const FilterPanel = ({ availableTags, availableTaxonomies, groupedTags, selectedTags }) => (
  <div className="sticky-top">
    {availableTaxonomies.map(t => (
      <div className="taxonomy-group" key={t.id}>
        <h3>{`${t.id.charAt(0).toUpperCase()}${t.id.slice(1)}`}</h3>
        <div>
          {groupedTags[t.id].map(tag => {
            let selectedClass = ''
            let disabledClass = ''
            let availableClass = ''
            let link = ''
            let tagsForPath = [...selectedTags]
            if (tagsForPath.includes(tag.slug)) {
              selectedClass = 'btn-primary'
              tagsForPath = tagsForPath.filter(t => t !== tag.slug)
            } else {
              if (availableTags.length) {
                if (!availableTags.includes(tag.slug)) {
                  disabledClass = 'disabled'
                } else {
                  selectedClass = 'btn-outline-primary'
                }
              }
              tagsForPath = [...tagsForPath, tag.slug]
            }
            link = tagsForPath.join('/')
            return (
              <Link
                to={`/content/${link}`}
                className={`ml-1 mt-1 btn btn-sm ${selectedClass} ${disabledClass} ${availableClass}`}
                key={tag.slug}
              >
                {tag.content.title}
              </Link>
            )
          })}
        </div>
      </div>
    ))}
  </div>
)

export default FilterPanel
