/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

/*

  Styles

*/

const welcomeStyle = {
  flexGrow: 1,
  flexShrink: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

/*

  Component

*/

const Welcome = ({ nickname }) => (
  <div style={welcomeStyle}>
    <h2>Welcome, {nickname}</h2>
    <button className="btn btn-lighy">
      Change nickname
    </button>
  </div>
)

export default Welcome
