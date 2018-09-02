/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const SearchResults = ({ name, results, createButton }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item active">{ name }</li>
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
