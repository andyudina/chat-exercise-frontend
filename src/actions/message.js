import {
  fetchChatApi,
  listMessagesApi,
  listNewMessagesApi,
  createMessageApi } from 'api/message'

import { sendMessage } from 'sockets/api'

/*

  Fetch chat with messages

*/

export const CHAT_FETCHED = 'CHAT_FETCHED'
export const FETCH_CHAT_FAILED = 'FETCH_CHAT_FAILED'
export const START_CHAT_FEATCHING = 'START_CHAT_FEATCHING'

const chatFetched = (chatId, chat, messages, hasNextPage) => {
  return {
    chat: chat,
    chatId: chatId,
    messages: messages,
    hasNextPage: hasNextPage,
    type: CHAT_FETCHED
  }
}

const fetchChatFailed = (chatId, errors) => {
  return {
    errors: errors,
    chatId: chatId,
    type: FETCH_CHAT_FAILED
  }
}

const chatFetchStarted = (chatId) => {
  return {
    chatId: chatId,
    type: START_CHAT_FEATCHING
  }
}

export const fetchChat = (chatId) => {
  return (dispatch) => {
    dispatch(chatFetchStarted(chatId))
    fetchChatApi(chatId)
      .then(({ errors, response }) => {
        if (errors) { dispatch(fetchChatFailed(chatId, errors)) }
        else {
          dispatch(
            chatFetched(
              chatId,
              response.chat,
              response.messages,
              response.hasNextPage
            ))
        }
      })
  }
}

/*

  List paginated messages

*/

export const MESSAGES_FETCHED = 'MESSAGES_FETCHED'
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED'
export const START_MESSAGES_FEATCHING = 'START_MESSAGES_FEATCHING'

const messagesFetched = (chatId, page, messages, hasNextPage) => {
  return {
    chatId: chatId,
    page: page,
    messages: messages,
    hasNextPage: hasNextPage,
    type: MESSAGES_FETCHED
  }
}

const fetchMessagesFailed = (chatId, errors) => {
  return {
    errors: errors,
    chatId: chatId,
    type: FETCH_MESSAGES_FAILED
  }
}

const fetchMessagesStarted = (chatId) => {
  return {
    chatId: chatId,
    type: START_MESSAGES_FEATCHING
  }
}

export const listMessages = (chatId, page) => {
  return (dispatch) => {
    dispatch(fetchMessagesStarted(chatId))
    listMessagesApi(chatId, page)
      .then(({ errors, response }) => {
        if (errors) { dispatch(fetchMessagesFailed(chatId, errors)) }
        else {
          dispatch(
            messagesFetched(
              chatId, page,
              response.messages,
              response.hasNextPage
            ))
        }
      })
  }
}

/*

  List new messages

*/

export const NEW_MESSAGES_FETCHED = 'NEW_MESSAGES_FETCHED'
export const FETCH_NEW_MESSAGES_FAILED = 'FETCH_NEW_MESSAGES_FAILED'
export const START_NEW_MESSAGES_FEATCHING = 'START_NEW_MESSAGES_FEATCHING'

const newMessagesFetched = (chatId, messages) => {
  return {
    chatId: chatId,
    messages: messages,
    type: NEW_MESSAGES_FETCHED
  }
}

const fetchNewMessagesFailed = (chatId, errors) => {
  return {
    chatId: chatId,
    errors: errors,
    type: FETCH_NEW_MESSAGES_FAILED
  }
}

const fetchNewMessagesStarted = (chatId) => {
  return {
    chatId: chatId,
    type: START_NEW_MESSAGES_FEATCHING
  }
}

export const listNewMessages = (chatId, date) => {
  return (dispatch) => {
    dispatch(fetchNewMessagesStarted())
    listNewMessagesApi(chatId, date)
      .then(({ errors, response }) => {
        if (errors) { dispatch(fetchNewMessagesFailed(chatId, errors)) }
        else {
          dispatch(newMessagesFetched(chatId, response.messages))
        }
      })
  }
}

/*

 Create message

 */

export const MESSAGE_CREATED = 'MESSAGE_CREATED'
export const CREATE_MESSAGES_FAILED = 'CREATE_MESSAGES_FAILED'
export const START_MESSAGE_CREATION = 'START_MESSAGES_CREATION'

const messageCreated = (chatId, message) => {
  return {
    chatId: chatId,
    message: message,
    type: MESSAGE_CREATED
  }
}

const createMessageFailed = (chatId, errors) => {
  return {
    chatId: chatId,
    errors: errors,
    type: CREATE_MESSAGES_FAILED
  }
}

const createMessageStarted = (chatId) => {
  return {
    chatId: chatId,
    type: START_MESSAGE_CREATION
  }
}

export const createMessage = (chatId, message) => {
  return (dispatch) => {
    dispatch(createMessageStarted(chatId))
    createMessageApi(chatId, message)
      .then(({ errors, response }) => {
        if (errors) { dispatch(createMessageFailed(chatId, errors)) }
        else {
          sendMessage(chatId)
          dispatch(messageCreated(chatId, response.message))
        }
      })
  }
}
