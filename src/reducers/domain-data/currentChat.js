import {
  CHAT_FETCHED,
  FETCH_CHAT_FAILED,
  START_CHAT_FEATCHING,

  MESSAGES_FETCHED,

  NEW_MESSAGES_FETCHED } from 'actions/message'

const defaultCurrentChat = {
  chat: {},
  messages: [],
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
          messages: defaultCurrentChat.messages
        }
      )
    case START_CHAT_FEATCHING:
      return Object.assign(
        {},
        state,
        {
          chat: defaultCurrentChat.chat,
          messages: defaultCurrentChat.messages
        }
      )
  }

  // Ignore subsequent action if chat has already changed
  if (action.chatId !== state.chat._id) { return state }

  switch (action.type) {
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
          lastLoadedPage: action.page,
          hasNextPage: action.hasNextPage
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
    default:
      return state
  }
}

export default currentChat
