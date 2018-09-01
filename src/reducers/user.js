import {
  RECEIVE_USER_INFO,
  RETRIEVE_CURRENT_USER_FAILED,

  NICKNAME_UPDATE_STARTED,
  NICKNAME_UPDATED,
  NICKNAME_UPDATE_FAILED,

  RECEIVE_USER_CHATS,
  RETRIEVE_USER_CHATS_FAILED } from '../actions/user'

import { DEFAULT_NICKNAME } from '../app-constants'

const defaultUser = {
  defaultNickname: DEFAULT_NICKNAME,

  isAuthenticated: null,
  isUserLoaded: false,
  user: {},

  isNicknameUpdating: false,
  nicknameUpdateErrors: {
    general: null,
    nickname: null
  },
  chats: []
}

const generateNameForPrivateChats = (chats, currentUserId) => {
  // Generate name for private chats, using participants nicknames
  const generateName = (chat) => {
    let name
    if ((chat.users.length === 1) &&
        (chat.users[0]._id === currentUserId)) {
      // Chat with itself is always called me
      name = 'Me'
    } else {
      // Chat with other users is called by their names
      name = chat.users
        .filter(user => user._id !== currentUserId)
        .map(user => (user.nickname || DEFAULT_NICKNAME))
        .join(', ')
    }
    return Object.assign(
      {},
      chat,
      { name: name }
    )
  }
  return chats.map(
    chat => chat.isGroupChat ? chat : generateName(chat)
  )
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    // Get current user
    case RECEIVE_USER_INFO:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: true,
          isUserLoaded: true,
          user: action.user
        }
      )
    case RETRIEVE_CURRENT_USER_FAILED:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: false,
          isUserLoaded: true,
          user: null
        }
      )
    // Update user nickname
    case NICKNAME_UPDATE_STARTED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: true
        }
      )
    case NICKNAME_UPDATED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: false,
          nicknameUpdateErrors: Object.assign(
            {},
            defaultUser.nicknameUpdateErrors
          ),
          user: Object.assign(
            {},
            state.user,
            { nickname: action.nickname }
          )
        }
      )
    case NICKNAME_UPDATE_FAILED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: false,
          nicknameUpdateErrors: Object.assign(
            {},
            defaultUser.nicknameUpdateErrors,
            action.errors
          )
        }
      )
    // Get current user chats
    case RECEIVE_USER_CHATS:
      return Object.assign(
        {},
        state,
        {
          chats: generateNameForPrivateChats(action.chats, state.user._id)
        }
      )
    case RETRIEVE_USER_CHATS_FAILED:
      // Fail silently and show previously loaded chats (if exists)
      return state
    default:
      return state
  }
}

export default user
