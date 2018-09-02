/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
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
    <Link to="/set-nickname" className="btn btn-lighy">
      Change nickname
    </Link>
  </div>
)

export default Welcome
