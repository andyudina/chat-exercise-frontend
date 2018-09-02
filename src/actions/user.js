import fetch from 'cross-fetch'

import { SERVER_API_URL } from 'app-constants'

import {
  createUrl,
  createUrlWithParams,
  unknownErrorOccurred,
  getErrors,
  createHeadersForJSONRequest,
  thisFieldIsRequiredError } from 'actions/_utils'

import { push } from 'react-router-redux'

const BASE_USER_API_URL = createUrl(SERVER_API_URL, 'users')

/*

  Get current user

*/

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const RETRIEVE_CURRENT_USER_FAILED = 'RETRIEVE_CURRENT_USER_FAILED'

const receiveCurrentUser = (json) => {
  return {
    user: json,
    type: RECEIVE_USER_INFO
  }
}

const retrieveCurrentUserFailed = () => {
  return {
    type: RETRIEVE_CURRENT_USER_FAILED
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    return fetch(
      createUrl(BASE_USER_API_URL, 'self'))
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Failed to fetch current user')
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

/*

  Update nickname

*/

export const NICKNAME_UPDATE_STARTED = 'NICKNAME_UPDATE_STARTED'
export const NICKNAME_UPDATED = 'NICKNAME_UPDATED'
export const NICKNAME_UPDATE_FAILED = 'NICKNAME_UPDATE_FAILED'

const nicknameUpdateStarted = () => ({
  type: NICKNAME_UPDATE_STARTED
})

const nicknameUpdateSucceeded = (nickname) => {
  return {
    nickname: nickname,
    type: NICKNAME_UPDATED
  }
}

const nicknameUpdateFailed = (errors) => {
  return {
    errors: errors,
    type: NICKNAME_UPDATE_FAILED
  }
}

export const updateNickname = (nickname) => {
  return (dispatch) => {
    if (!(nickname)) {
      dispatch(
        nicknameUpdateFailed(
          thisFieldIsRequiredError('nickname')
        )
      )
      return
    }
    dispatch(nicknameUpdateStarted())
    return fetch(
      createUrl(BASE_USER_API_URL, 'self'),
      {
        method: 'PUT',
        headers: createHeadersForJSONRequest(),
        body: JSON.stringify({
          nickname: nickname
        })
      })
      .then(response => {
        // Needed to process response data and status
        // at the same time
        return response
          .json()
          .then(data => ({ status: response.status, data: data }))
      })
      .then(response => {
        if (response.status >= 400) {
          dispatch(
            nicknameUpdateFailed(
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(nicknameUpdateSucceeded(response.data.nickname))
        dispatch(push('/'))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          nicknameUpdateFailed(
            unknownErrorOccurred()
          )
        )
      })
  }
}

/*

  Get chats for user

*/

export const RECEIVE_USER_CHATS = 'RECEIVE_USER_CHATS'
export const RETRIEVE_USER_CHATS_FAILED = 'RETRIEVE_USER_CHATS_FAILED'

const receiveUserChats = (chats) => {
  return {
    chats: chats,
    type: RECEIVE_USER_CHATS
  }
}

const retrieveUserChatsFailed = () => {
  return {
    type: RETRIEVE_USER_CHATS_FAILED
  }
}

export const retrieveUserChats = () => {
  return (dispatch) => {
    return fetch(
      createUrl(BASE_USER_API_URL, 'self', 'chats'))
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Failed to fetch recent chats')
        }
        return response.json()
      })
      .then(json => dispatch(receiveUserChats(json.chats)))
      .catch(err => {
        console.log(err)
        dispatch(retrieveUserChatsFailed())
      })
  }
}

/*

  Search user by nickname

*/

export const USERS_FOUND = 'USERS_FOUND'
export const SEARCH_USERS_FAILED = 'SEARCH_USERS_FAILED'
export const START_USERS_SEARCH = 'START_USERS_SEARCH'

const usersFound = (users) => {
  return {
    users: users,
    type: USERS_FOUND
  }
}

const searchUsersFailed = (errors) => {
  return {
    errors: errors,
    type: SEARCH_USERS_FAILED
  }
}

const usersSearchStarted = () => {
  return {
    type: START_USERS_SEARCH
  }
}

export const searchUsers = (nickname) => {
  return (dispatch) => {
    if (!(nickname)) {
      dispatch(
        searchUsersFailed(
          thisFieldIsRequiredError('nickname')
        )
      )
      return
    }
    dispatch(usersSearchStarted())
    console.log(createUrlWithParams)
    return fetch(
      createUrlWithParams(
        BASE_USER_API_URL,
        {
          nickname: nickname
        }
      ))
      .then(response => {
        // Needed to process response data and status
        // at the same time
        return response
          .json()
          .then(data => ({ status: response.status, data: data }))
      })
      .then(response => {
        if (response.status >= 400) {
          dispatch(
            searchUsersFailed(
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(usersFound(response.data.users))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          searchUsersFailed(
            unknownErrorOccurred()
          )
        )
      })
  }
}
