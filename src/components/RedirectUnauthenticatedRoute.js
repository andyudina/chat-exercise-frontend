// Redirect to authentication if user is not authenticated
/* eslint-disable no-unused-vars */
import React from 'react'
import { Route } from 'react-router-dom'
/* eslint-enable no-unused-vars */

import { SERVER_URL } from '../app-constants'

const RedirectUnauthenticatedRouter = ({
  isAuthenticated, component: Component, ...rest }) => {
  // Redirect to external to react app link
  const redirectToExternalLink = () => {
    window.location = `${SERVER_URL}auth/google`
    return null
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Route path='*'
            component={ redirectToExternalLink }/>
        )
      }
    />
  )
}

export default RedirectUnauthenticatedRouter
