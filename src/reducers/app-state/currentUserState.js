import {
  RECEIVE_USER_INFO,
  RETRIEVE_CURRENT_USER_FAILED } from 'actions/user'

const defaultUser = {
  isAuthenticated: null,
  isLoaded: false
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    // Get current user
    case RECEIVE_USER_INFO:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: true,
          isLoaded: true
        }
      )
    case RETRIEVE_CURRENT_USER_FAILED:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: false,
          isLoaded: true
        }
      )
    default:
      return state
  }
}

export default user
