import {
  CHAT_FETCHED,
  FETCH_CHAT_FAILED,
  START_CHAT_FEATCHING,

  MESSAGES_FETCHED,
  FETCH_MESSAGES_FAILED,
  START_MESSAGES_FEATCHING } from 'actions/message'

const defaultCurrentChat = {
  isLoading: false,
  fetchErrors: {
    chat: null,
    general: null
  },
  loadChatSuccessfully: false
}

const currentChat = (state = defaultCurrentChat, action) => {
  switch (action.type) {
    case CHAT_FETCHED:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          fetchErrors: defaultCurrentChat.fetchErrors,
          loadChatSuccessfully: true
        }
      )
    case FETCH_CHAT_FAILED:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          fetchErrors: action.errors,
          loadChatSuccessfully: false
        }
      )
    case START_CHAT_FEATCHING:
      return Object.assign(
        {},
        state,
        {
          isLoading: true,
          fetchErrors: defaultCurrentChat.fetchErrors
        }
      )
    case MESSAGES_FETCHED:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          fetchErrors: defaultCurrentChat.fetchErrors,
          loadChatSuccessfully: true
        }
      )
    case FETCH_MESSAGES_FAILED:
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          fetchErrors: action.errors,
          loadChatSuccessfully: false
        }
      )
    case START_MESSAGES_FEATCHING:
      return Object.assign(
        {},
        state,
        {
          isLoading: true,
          fetchErrors: defaultCurrentChat.fetchErrors
        }
      )
    default:
      return state
  }
}

export default currentChat
