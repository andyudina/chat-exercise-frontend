import {
  JOINED_CHAT,
  FAILED_TO_JOIN_CHAT,
  ATTEMPT_TO_JOIN_CHAT } from '../actions/chat'

const defaultChat = {
  failedToJoin: {},
  isTryingToJoin: {}
}

const chat = (state = defaultChat, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default chat
