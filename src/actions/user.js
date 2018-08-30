import fetch from 'cross-fetch'

import { SERVER_API_URL } from '../app-constants'

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const RETRIEVE_CURRENT_USER_FAILED = 'RETRIEVE_CURRENT_USER_FAILED'

const BASE_USER_API_URL = SERVER_API_URL + 'users/'

const receiveCurrentUser = (json) => {
  // current user data
  // fetched successfully
  return {
    user: json,
    type: RECEIVE_USER_INFO
  }
}

const retrieveCurrentUserFailed = () => {
  // current user request falied
  return {
    type: RETRIEVE_CURRENT_USER_FAILED
  }
}

export const getCurrentUser = () => {
  // Retrieve information about current user
  return (dispatch) => {
    return fetch(
      BASE_USER_API_URL + 'self/')
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Failed to fecth current user')
        }
        return response.json()
      })
      .then(json => dispatch(receiveCurrentUser(json)))
      .catch(err => {
        console.log(err)
        dispatch(retrieveCurrentUserFailed())
      })
  }
}
