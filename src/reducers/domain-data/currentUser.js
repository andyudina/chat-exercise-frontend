import {
  RECEIVE_USER_INFO,
  RETRIEVE_CURRENT_USER_FAILED } from 'actions/user'

const defaultUser = null

const user = (state = defaultUser, action) => {
  switch (action.type) {
    // Get current user
    case RECEIVE_USER_INFO:
      return action.user
    case RETRIEVE_CURRENT_USER_FAILED:
      return defaultUser
    default:
      return state
  }
}

export default user
