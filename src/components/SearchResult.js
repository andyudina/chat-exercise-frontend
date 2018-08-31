/* eslint-disable no-unused-vars */
import React from 'react'
import JoinChatButton from '../containers/JoinChatButton'
/* eslint-enable no-unused-vars */

const SearchResult = ({ results, onClickCallback }) => {
  return (
    <ul className="list-group">
      {
        results.map(
          result =>
            <li key={result._id} className="list-group-item">
              {result.name}
              <JoinChatButton chatId={result._id}/>
            </li>
        )
      }
    </ul>
  )
}

export default SearchResult
