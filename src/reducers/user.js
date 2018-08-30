import { RECEIVE_USER_INFO, RETRIEVE_CURRENT_USER_FAILED } from '../actions/user'

const defaultUser = {
  isAuthenticated: null,
  isUserLoaded: false,
  user: null
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: true,
          isUserLoaded: true,
          user: action.user
        }
      )
    case RETRIEVE_CURRENT_USER_FAILED:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: false,
          isUserLoaded: true,
          user: null
        }
      )
    default:
      return state
  }
}

export default user
