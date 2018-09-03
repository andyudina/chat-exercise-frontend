/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const NothingFound = ({ name }) => (
  <div>
    <div className="list-group-item">
       { name }
    </div>
    <div className="alert alert-warning">
      Ups, nothing was found
    </div>
  </div>
)

export default NothingFound
