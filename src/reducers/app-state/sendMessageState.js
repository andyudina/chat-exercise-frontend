import {
  MESSAGE_CREATED,
  CREATE_MESSAGES_FAILED,
  START_MESSAGE_CREATION } from 'actions/message'

const defaultSendMessageState = {
  errors: {
    general: null,
    message: null
  },
  isSending: false
}

const sendMessageState = (state = defaultSendMessageState, action) => {
  switch (action.type) {
    // Send message
    case MESSAGE_CREATED:
      return Object.assign(
        {},
        state,
        {
          errors: defaultSendMessageState.errors,
          isSending: false
        }
      )
    case CREATE_MESSAGES_FAILED:
      return Object.assign(
        {},
        state,
        {
          errors: action.errors,
          isSending: false
        }
      )
    case START_MESSAGE_CREATION:
      return Object.assign(
        {},
        state,
        {
          errors: defaultSendMessageState.errors,
          isSending: true
        }
      )
    default:
      return state
  }
}

export default sendMessageState
