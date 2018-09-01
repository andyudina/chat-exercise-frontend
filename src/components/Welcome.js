/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const Welcome = ({ nickname }) => (
  <div>
    <h2>Welcome, {nickname}</h2>
    <button className="btn btn-lighy">
      Change nickname
    </button>
  </div>
)

export default Welcome
