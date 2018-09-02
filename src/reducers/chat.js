import {
  JOINED_CHAT,
  FAILED_TO_JOIN_CHAT,
  ATTEMPT_TO_JOIN_CHAT,

  PRIVATE_CHAT_CREATED,
  FAILED_TO_CREATE_PRIVATE_CHAT,
  ATTEMPT_TO_CREATE_PRIVATE_CHAT,

  GROUP_CHAT_CREATED,
  FAILED_TO_CREATE_GROUP_CHAT,
  ATTEMPT_TO_CREATE_GROUP_CHAT } from 'actions/chat'

const defaultChat = {
  // Join chat
  failedToJoin: {},
  isTryingToJoin: {},

  // Create chat
  failedToCreatePrivateChat: {},
  isTryingToCreatePrivateChat: {},

  // Create group chat
  isCreating: false,
  chatCreateError: {},
  createdChatId: null
}

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    // Join chat
    case JOINED_CHAT:
      return Object.assign(
        {},
        state,
        {
          failedToJoin: Object.assign(
            {},
            state.failedToJoin,
            {
              [action.chatId]: false
            }
          ),
          isTryingToJoin: Object.assign(
            {},
            state.isTryingToJoin,
            {
              [action.chatId]: false
            }
          )
        }
      )
    case FAILED_TO_JOIN_CHAT:
      return Object.assign(
        {},
        state,
        {
          failedToJoin: Object.assign(
            {},
            state.failedToJoin,
            {
              [action.chatId]: true
            }
          ),
          isTryingToJoin: Object.assign(
            {},
            state.isTryingToJoin,
            {
              [action.chatId]: false
            }
          )
        }
      )
    case ATTEMPT_TO_JOIN_CHAT:
      return Object.assign(
        {},
        state,
        {
          failedToJoin: Object.assign(
            {},
            state.failedToJoin,
            {
              [action.chatId]: false
            }
          ),
          isTryingToJoin: Object.assign(
            {},
            state.isTryingToJoin,
            {
              [action.chatId]: true
            }
          )
        }
      )
    // Create private chat
    case PRIVATE_CHAT_CREATED:
      return Object.assign(
        {},
        state,
        {
          failedToCreatePrivateChat: Object.assign(
            {},
            state.failedToCreatePrivateChat,
            {
              [action.userId]: false
            }
          ),
          isTryingToCreatePrivateChat: Object.assign(
            {},
            state.isTryingToCreatePrivateChat,
            {
              [action.userId]: false
            }
          )
        }
      )
    case FAILED_TO_CREATE_PRIVATE_CHAT:
      return Object.assign(
        {},
        state,
        {
          failedToCreatePrivateChat: Object.assign(
            {},
            state.failedToCreatePrivateChat,
            {
              [action.userId]: true
            }
          ),
          isTryingToCreatePrivateChat: Object.assign(
            {},
            state.isTryingToCreatePrivateChat,
            {
              [action.userId]: false
            }
          )
        }
      )
    case ATTEMPT_TO_CREATE_PRIVATE_CHAT:
      return Object.assign(
        {},
        state,
        {
          failedToCreatePrivateChat: Object.assign(
            {},
            state.failedToCreatePrivateChat,
            {
              [action.userId]: false
            }
          ),
          isTryingToCreatePrivateChat: Object.assign(
            {},
            state.isTryingToCreatePrivateChat,
            {
              [action.userId]: true
            }
          )
        }
      )
    // Create group chat
    case GROUP_CHAT_CREATED:
      return Object.assign(
        {},
        state,
        {
          isCreating: false,
          chatCreateError: defaultChat.chatCreateError,
          createdChatId: action.chatId
        }
      )
    case FAILED_TO_CREATE_GROUP_CHAT:
      return Object.assign(
        {},
        state,
        {
          isCreating: false,
          chatCreateError: action.errors,
          createdChatId: null
        }
      )
    case ATTEMPT_TO_CREATE_GROUP_CHAT:
      return Object.assign(
        {},
        state,
        {
          isCreating: true,
          chatCreateError: defaultChat.chatCreateError,
          createdChatId: null
        }
      )
    default:
      return state
  }
}

export default chat
