/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const SearchResults = ({ results, createButton }) => {
  return (
    <ul className="list-group">
      {
        results.map(
          result =>
            <li key={result._id} className="list-group-item">
              {result.name}
              {createButton(result._id)}
            </li>
        )
      }
    </ul>
  )
}

export default SearchResults
