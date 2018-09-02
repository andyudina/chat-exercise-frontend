import fetch from 'cross-fetch'

import { SERVER_API_URL } from '../app-constants'

import {
  createUrl,
  createUrlWithParams,
  unknownErrorOccurred,
  getErrors,
  thisFieldIsRequiredError,
  createHeadersForJSONRequest,
  isDate } from './_utils'

const BASE_CHAT_API_URL = createUrl(SERVER_API_URL, 'users', 'self', 'chats')

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
    if (!(chatId)) {
      dispatch(
        fetchChatFailed(
          chatId,
          thisFieldIsRequiredError('chat')
        )
      )
      return
    }
    dispatch(chatFetchStarted(chatId))
    return fetch(
      createUrl(BASE_CHAT_API_URL, chatId))
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
            fetchChatFailed(
              chatId,
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(
          chatFetched(
            chatId,
            response.data.chat,
            response.data.messages,
            response.data.hasNextPage
          )
        )
      })
      .catch(err => {
        console.log(err)
        dispatch(
          fetchChatFailed(
            chatId,
            unknownErrorOccurred()
          )
        )
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
    if (!(chatId)) {
      dispatch(
        fetchMessagesFailed(
          chatId,
          thisFieldIsRequiredError('chat')
        )
      )
      return
    }
    if (!(page)) {
      dispatch(
        fetchMessagesFailed(
          chatId,
          thisFieldIsRequiredError('page')
        )
      )
      return
    }
    dispatch(fetchMessagesStarted(chatId))
    return fetch(
      createUrlWithParams(
        createUrl(BASE_CHAT_API_URL, chatId, 'messages'),
        {
          page: page
        }))
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
            fetchMessagesFailed(
              chatId, getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(
          messagesFetched(
            chatId, page,
            response.data.messages,
            response.data.hasNextPage
          )
        )
      })
      .catch(err => {
        console.log(err)
        dispatch(
          fetchMessagesFailed(
            chatId, unknownErrorOccurred()
          )
        )
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
    if (!(chatId)) {
      dispatch(
        fetchNewMessagesFailed(
          chatId, thisFieldIsRequiredError('chat')
        )
      )
      return
    }
    if (!(date)) {
      dispatch(
        fetchNewMessagesFailed(
          chatId,
          thisFieldIsRequiredError('date')
        )
      )
      return
    }
    if (!(isDate(date))) {
      dispatch(
        fetchNewMessagesFailed(
          chatId,
          {
            date: 'Please use valid date'
          }
        )
      )
      return
    }
    dispatch(fetchNewMessagesStarted())
    return fetch(
      createUrlWithParams(
        createUrl(BASE_CHAT_API_URL, chatId, 'messages', 'new'),
        {
          date: date
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
            fetchNewMessagesFailed(
              chatId, getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(
          newMessagesFetched(
            chatId, response.data.messages
          )
        )
      })
      .catch(err => {
        console.log(err)
        dispatch(
          fetchNewMessagesFailed(
            chatId, unknownErrorOccurred()
          )
        )
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
    if (!(chatId)) {
      dispatch(
        createMessageFailed(
          chatId, thisFieldIsRequiredError('chat')
        )
      )
      return
    }
    if (!(message)) {
      dispatch(
        createMessageFailed(
          chatId, thisFieldIsRequiredError('message')
        )
      )
      return
    }
    dispatch(createMessageStarted(chatId))
    return fetch(
      createUrl(BASE_CHAT_API_URL, chatId, 'messages'),
      {
        method: 'POST',
        headers: createHeadersForJSONRequest(),
        body: JSON.stringify({
          message: message
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
            createMessageFailed(
              chatId, getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(
          messageCreated(
            chatId, response.data.message
          )
        )
      })
      .catch(err => {
        console.log(err)
        dispatch(
          createMessageFailed(
            chatId, unknownErrorOccurred()
          )
        )
      })
  }
}
