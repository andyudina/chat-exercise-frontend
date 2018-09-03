import {
  RECEIVE_USER_CHATS,
  RETRIEVE_USER_CHATS_FAILED } from 'actions/user'

const defaultChats = []

const chats = (state = defaultChats, action) => {
  switch (action.type) {
    case RECEIVE_USER_CHATS:
      return action.chats
    case RETRIEVE_USER_CHATS_FAILED:
      // Fail silently and show previously loaded chats (if exists)
      return defaultChats
    default:
      return state
  }
}

export default chats
