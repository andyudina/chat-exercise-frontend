import {
  CHAT_FETCHED,
  FETCH_CHAT_FAILED,
  START_CHAT_FEATCHING,

  MESSAGE_CREATED,
  CREATE_MESSAGES_FAILED,
  START_MESSAGE_CREATION,

  MESSAGES_FETCHED,
  FETCH_MESSAGES_FAILED,
  START_MESSAGES_FEATCHING } from '../actions/message'

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
  messageIsSending: false,
  // Last loaded page with messages
  lastLoadedPage: null,
  hasNextPage: false
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
          fetchErrors: defaultCurrentChat.fetchErrors,
          lastLoadedPage: 1,
          hasNextPage: action.hasNextPage
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
          fetchErrors: action.errors,
          lastLoadedPage: null
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
          fetchErrors: defaultCurrentChat.fetchErrors,
          lastLoadedPage: null
        }
      )
    // Send message
    case MESSAGE_CREATED:
      // Ignore action if chat has already changed
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
      // Ignore action if chat has already changed
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
      // Ignore action if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: defaultCurrentChat.sendMessageErrors,
          messageIsSending: true
        }
      )
    // Fetch more messages
    case MESSAGES_FETCHED:
      // Ignore action if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          messages: [
            ...action.messages.reverse(),
            ...state.messages
          ],
          isLoading: false,
          fetchErrors: defaultCurrentChat.fetchErrors,
          lastLoadedPage: action.page,
          hasNextPage: action.hasNextPage
        }
      )
    case FETCH_MESSAGES_FAILED:
      // Ignore action if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
      return Object.assign(
        {},
        state,
        {
          isLoading: false,
          fetchErrors: action.errors
        }
      )
    case START_MESSAGES_FEATCHING:
      // Ignore action if chat has already changed
      if (action.chatId !== state.chat._id) { return state }
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
