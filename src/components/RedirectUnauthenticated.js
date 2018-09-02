// Redirect to authentication if user is not authenticated
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

import { SERVER_URL } from '../app-constants'

const RedirectUnauthenticated = ({ isAuthenticated, children }) => {
  // Redirect to external to react app link
  const redirectToExternalLink = () => {
    window.location = `${SERVER_URL}auth/google`
    return null
  }

  if (isAuthenticated) {
    return (children)
  } else {
    return redirectToExternalLink()
  }
}

export default RedirectUnauthenticated
