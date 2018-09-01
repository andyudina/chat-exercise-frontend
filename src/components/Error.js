/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

const errorStyle = {
  margin: 10
}

const Error = ({ error }) => (
  <div style={errorStyle} className="alert alert-danger">
    { error }
  </div>
)

export default Error
