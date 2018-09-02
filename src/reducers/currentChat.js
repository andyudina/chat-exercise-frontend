import {
  CHAT_FETCHED,
  FETCH_CHAT_FAILED,
  START_CHAT_FEATCHING,

  MESSAGE_CREATED,
  CREATE_MESSAGES_FAILED,
  START_MESSAGE_CREATION,

  MESSAGES_FETCHED,
  FETCH_MESSAGES_FAILED,
  START_MESSAGES_FEATCHING,

  NEW_MESSAGES_FETCHED,
  FETCH_NEW_MESSAGES_FAILED,
  START_NEW_MESSAGES_FEATCHING } from 'actions/message'

const defaultCurrentChat = {
  chat: {},
  messages: [],
  isLoading: false,
  fetchErrors: {
    chat: null,
    general: null
  },
  loadChatSuccessfully: false,
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

const appendNewMessages = (oldMessages, newMessages) => {
  // Append new messages excluding duplicates
  const oldMessagesIds = Object.assign(
    {},
    ...oldMessages.map(message => ({ [message._id]: true }))
  )
  return [
    ...oldMessages,
    ...newMessages.filter(message => !oldMessagesIds[message._id])
  ]
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
          hasNextPage: action.hasNextPage,
          loadChatSuccessfully: true
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
          lastLoadedPage: null,
          loadChatSuccessfully: false
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
  }

  // Ignore subsequent action if chat has already changed
  if (action.chatId !== state.chat._id) { return state }

  switch (action.type) {
    // Send message
    case MESSAGE_CREATED:
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: defaultCurrentChat.sendMessageErrors,
          messageIsSending: false
        }
      )
    case CREATE_MESSAGES_FAILED:
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: action.errors,
          messageIsSending: false
        }
      )
    case START_MESSAGE_CREATION:
      return Object.assign(
        {},
        state,
        {
          sendMessageErrors: defaultCurrentChat.sendMessageErrors,
          messageIsSending: true
        }
      )
    // Fetch more old messages
    case MESSAGES_FETCHED:
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
          hasNextPage: action.hasNextPage,
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
    // Fetch new messages
    // TODO: how page number will change with new messages?
    // Fix message duplicates, caused by page change
    case NEW_MESSAGES_FETCHED:
      return Object.assign(
        {},
        state,
        {
          messages: appendNewMessages(
            state.messages,
            action.messages
          )
        }
      )
    case FETCH_NEW_MESSAGES_FAILED:
      // Silence errors
      return state
    case START_NEW_MESSAGES_FEATCHING:
      // Silence new message loading
      return state
    default:
      return state
  }
}

export default currentChat
