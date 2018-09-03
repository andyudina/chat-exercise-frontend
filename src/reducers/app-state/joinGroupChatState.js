import {
  JOINED_CHAT,
  FAILED_TO_JOIN_CHAT,
  ATTEMPT_TO_JOIN_CHAT } from 'actions/chat'

const defaultChat = {
  failed: {},
  isTrying: {}
}

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    case JOINED_CHAT:
      return Object.assign(
        {},
        state,
        {
          failed: Object.assign(
            {},
            state.failed,
            {
              [action.chatId]: false
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
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
          failed: Object.assign(
            {},
            state.failed,
            {
              [action.chatId]: true
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
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
          failed: Object.assign(
            {},
            state.failed,
            {
              [action.chatId]: false
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
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
