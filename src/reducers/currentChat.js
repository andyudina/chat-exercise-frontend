import {
  CHAT_FETCHED,
  FETCH_CHAT_FAILED,
  START_CHAT_FEATCHING,

  MESSAGE_CREATED,
  CREATE_MESSAGES_FAILED,
  START_MESSAGE_CREATION } from '../actions/message'

const defaultCurrentChat = {
  chat: {},
  messages: [],
  isLoading: false,
  fetchErrors: {
    chat: null,
    general: null
  },
  // Send message
  sendMessageErrors: {
    general: null,
    message: null
  },
  messageIsSending: false
}

const currentChat = (state = defaultCurrentChat, action) => {
  switch (action.type) {
    case CHAT_FETCHED:
      return Object.assign(
        {},
        state,
        {
          chat: action.chat,
          messages: action.messages.reverse(),
          isLoading: false,
          fetchErrors: defaultCurrentChat.fetchErrors
        }
      )
    case FETCH_CHAT_FAILED:
      return Object.assign(
        {},
        state,
        {
          chat: defaultCurrentChat.chat,
          messages: defaultCurrentChat.messages,
          isLoading: false,
          fetchErrors: action.errors
        }
      )
    case START_CHAT_FEATCHING:
      return Object.assign(
        {},
        state,
        {
          chat: defaultCurrentChat.chat,
          messages: defaultCurrentChat.messages,
          isLoading: true,
          fetchErrors: defaultCurrentChat.fetchErrors
        }
      )
    // Send message
    case MESSAGE_CREATED:
      // Ignore messages if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: defaultCurrentChat.sendMessageErrors,
          messageIsSending: false
        }
      )
    case CREATE_MESSAGES_FAILED:
      // Ignore messages if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: action.errors,
          messageIsSending: false
        }
      )
    case START_MESSAGE_CREATION:
      // Ignore messages if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: defaultCurrentChat.sendMessageErrors,
          messageIsSending: true
        }
      )
    default:
      return state
  }
}

export default currentChat
