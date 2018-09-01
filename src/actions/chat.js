import fetch from 'cross-fetch'

import { SERVER_API_URL } from '../app-constants'

import {
  createUrl,
  createUrlWithParams,
  unknownErrorOccurred,
  getErrors,
  thisFieldIsRequiredError,
  createHeadersForJSONRequest } from './_utils'

const BASE_CHAT_API_URL = createUrl(SERVER_API_URL, 'chats')

/*

  Search chat by name

*/

export const CHATS_FOUND = 'CHATS_FOUND'
export const SEARCH_CHATS_FAILED = 'SEARCH_CHATS_FAILED'
export const START_CHATS_SEARCH = 'START_CHATS_SEARCH'

const chatsFound = (chats) => {
  return {
    chats: chats,
    type: CHATS_FOUND
  }
}

const searchChatsFailed = (errors) => {
  return {
    errors: errors,
    type: SEARCH_CHATS_FAILED
  }
}

const chatsSearchStarted = () => {
  return {
    type: START_CHATS_SEARCH
  }
}

export const searchChats = (name) => {
  return (dispatch) => {
    if (!(name)) {
      dispatch(
        searchChatsFailed(
          thisFieldIsRequiredError('name')
        )
      )
      return
    }
    dispatch(chatsSearchStarted())
    return fetch(
      createUrlWithParams(
        BASE_CHAT_API_URL,
        {
          name: name
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
            searchChatsFailed(
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(chatsFound(response.data.chats))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          searchChatsFailed(
            unknownErrorOccurred()
          )
        )
      })
  }
}

/*

  Join group chat

*/

export const JOINED_CHAT = 'JOINED_CHAT'
export const FAILED_TO_JOIN_CHAT = 'FAILED_TO_JOIN_CHAT'
export const ATTEMPT_TO_JOIN_CHAT = 'ATTEMPT_TO_JOIN_CHAT'

const chatJoined = (chatId) => {
  return {
    chatId: chatId,
    type: JOINED_CHAT
  }
}

const failedToJoinChat = (chatId) => {
  return {
    chatId: chatId,
    type: FAILED_TO_JOIN_CHAT
  }
}

const attemptToJoinChat = (chatId) => {
  return {
    chatId: chatId,
    type: ATTEMPT_TO_JOIN_CHAT
  }
}

export const joinChat = (chatId) => {
  return (dispatch) => {
    if (!(chatId)) {
      dispatch(
        failedToJoinChat(chatId)
      )
      return
    }
    dispatch(attemptToJoinChat(chatId))
    return fetch(
      createUrl(BASE_CHAT_API_URL, chatId),
      {
        method: 'PUT'
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
          dispatch(failedToJoinChat(chatId))
          return
        }
        dispatch(chatJoined(response.data._id))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          failedToJoinChat(chatId)
        )
      })
  }
}

/*

  Start private chat with user

*/

export const PRIVATE_CHAT_CREATED = 'PRIVATE_CHAT_CREATED'
export const FAILED_TO_CREATE_PRIVATE_CHAT = 'FAILED_TO_CREATE_PRIVATE_CHAT'
export const ATTEMPT_TO_CREATE_PRIVATE_CHAT = 'ATTEMPT_TO_CREATE_PRIVATE_CHAT'

const privateChatCreated = (userId, chatId) => {
  return {
    userId: userId,
    chatId: chatId,
    type: PRIVATE_CHAT_CREATED
  }
}

const failedToCreatePrivateChat = (userId) => {
  return {
    userId: userId,
    type: FAILED_TO_CREATE_PRIVATE_CHAT
  }
}

const attemptToCreatePrivateChat = (userId) => {
  return {
    userId: userId,
    type: ATTEMPT_TO_CREATE_PRIVATE_CHAT
  }
}

export const createPrivateChat = (userId) => {
  return (dispatch) => {
    if (!(userId)) {
      dispatch(
        failedToCreatePrivateChat(userId)
      )
      return
    }
    dispatch(attemptToCreatePrivateChat(userId))
    return fetch(
      createUrl(BASE_CHAT_API_URL, 'private'),
      {
        method: 'POST',
        headers: createHeadersForJSONRequest(),
        body: JSON.stringify({
          user: userId
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
          dispatch(failedToCreatePrivateChat(userId))
          return
        }
        dispatch(privateChatCreated(userId, response.data._id))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          failedToCreatePrivateChat(userId)
        )
      })
  }
}
