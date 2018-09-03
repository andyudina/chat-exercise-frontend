import {
  USERS_FOUND,
  SEARCH_USERS_FAILED } from 'actions/user'

const defaultSearch = []

const search = (state = defaultSearch, action) => {
  switch (action.type) {
    // Users search
    case USERS_FOUND:
      return action.users
    case SEARCH_USERS_FAILED:
      return defaultSearch.userResults
    default:
      return state
  }
}

export default search
