import {
  CHATS_FOUND,
  SEARCH_CHATS_FAILED } from 'actions/chat'

const defaultSearch = []

const search = (state = defaultSearch, action) => {
  switch (action.type) {
    case CHATS_FOUND:
      return action.chats
    case SEARCH_CHATS_FAILED:
      return defaultSearch.chatResults
    default:
      return state
  }
}

export default search
