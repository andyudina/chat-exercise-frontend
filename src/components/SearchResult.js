/* eslint-disable no-unused-vars */
import React from 'react'
import { MdChevronRight } from 'react-icons/md'
/* eslint-enable no-unused-vars */

const SearchResult = ({ results, onClickCallback }) => {
  return (
    <ul className="list-group">
      {
        results.map(
          result =>
            <li key={result._id} className="list-group-item">
              {result.name}
              <span className="badge badge-primary float-right m-2"
                onClick={
                  (e) => {
                    e.preventDefault()
                    onClickCallback(result._id)
                  }
                }>
                <MdChevronRight />
              </span>
            </li>
        )
      }
    </ul>
  )
}

export default SearchResult
