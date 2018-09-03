import {
  PRIVATE_CHAT_CREATED,
  FAILED_TO_CREATE_PRIVATE_CHAT,
  ATTEMPT_TO_CREATE_PRIVATE_CHAT } from 'actions/chat'

const defaultChat = {
  failed: {},
  isTrying: {}
}

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    case PRIVATE_CHAT_CREATED:
      return Object.assign(
        {},
        state,
        {
          failed: Object.assign(
            {},
            state.failed,
            {
              [action.userId]: false
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
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
          failed: Object.assign(
            {},
            state.failedT,
            {
              [action.userId]: true
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
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
          failed: Object.assign(
            {},
            state.failed,
            {
              [action.userId]: false
            }
          ),
          isTrying: Object.assign(
            {},
            state.isTrying,
            {
              [action.userId]: true
            }
          )
        }
      )
    default:
      return state
  }
}

export default chat
