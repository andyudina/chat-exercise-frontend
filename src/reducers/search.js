import {
  USERS_FOUND,
  SEARCH_USERS_FAILED,
  START_USERS_SEARCH } from 'actions/user'

import {
  CHATS_FOUND,
  SEARCH_CHATS_FAILED,
  START_CHATS_SEARCH } from 'actions/chat'

const defaultSearch = {
  isSearchingUsers: false,
  isSearchingChats: false,
  chatResults: [],
  usersResults: [],
  // Errors
  chatSearchError: null,
  userSearchError: null
}

const search = (state = defaultSearch, action) => {
  switch (action.type) {
    // Users search
    case USERS_FOUND:
      return Object.assign(
        {},
        state,
        {
          isSearchingUsers: false,
          userResults: action.users,
          userSearchError: null
        }
      )
    case SEARCH_USERS_FAILED:
      return Object.assign(
        {},
        state,
        {
          isSearchingUsers: false,
          userResults: defaultSearch.userResults,
          userSearchError: (action.errors.nickname || action.errors.general)
        }
      )
    case START_USERS_SEARCH:
      return Object.assign(
        {},
        state,
        {
          isSearchingUsers: true,
          userSearchError: null
        }
      )
    // Chats search
    case CHATS_FOUND:
      return Object.assign(
        {},
        state,
        {
          isSearchingChats: false,
          chatResults: action.chats,
          chatSearchError: null
        }
      )
    case SEARCH_CHATS_FAILED:
      return Object.assign(
        {},
        state,
        {
          isSearchingChats: false,
          chatResults: defaultSearch.chatResults,
          chatSearchError: (action.errors.name || action.errors.general)
        }
      )
    case START_CHATS_SEARCH:
      return Object.assign(
        {},
        state,
        {
          isSearchingChats: true,
          chatSearchError: null
        }
      )
    default:
      return state
  }
}

export default search
