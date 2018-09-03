import { push } from 'react-router-redux'

import {
  getCurrentUserApi,
  updateNicknameApi,
  retrieveUserChatsApi,
  searchUsersApi } from 'api/user'

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
    getCurrentUserApi()
      .then(({ errors, response }) => {
        if (errors) { dispatch(retrieveCurrentUserFailed()) }
        else { dispatch(receiveCurrentUser(response)) }
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
    dispatch(nicknameUpdateStarted())
    updateNicknameApi(nickname)
      .then(({ errors, response }) => {
        if (errors) { dispatch(nicknameUpdateFailed(errors)) }
        else {
          dispatch(nicknameUpdateSucceeded(response.nickname))
          dispatch(push('/'))
        }
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
    retrieveUserChatsApi()
      .then(({ errors, response }) => {
        if (errors) { dispatch(retrieveUserChatsFailed()) }
        else { dispatch(receiveUserChats(response.chats)) }
      })
  }
}

/*

  Search users by nickname

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
    dispatch(usersSearchStarted())
    searchUsersApi(nickname)
      .then(({ errors, response }) => {
        if (errors) { dispatch(searchUsersFailed(errors)) }
        else { dispatch(usersFound(response.users)) }
      })
  }
}
