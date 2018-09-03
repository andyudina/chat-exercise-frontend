import {
  GROUP_CHAT_CREATED,
  FAILED_TO_CREATE_GROUP_CHAT,
  ATTEMPT_TO_CREATE_GROUP_CHAT } from 'actions/chat'

const defaultChat = {
  isCreating: false,
  errors: {},
  createdChatId: null
}

const chat = (state = defaultChat, action) => {
  switch (action.type) {
    case GROUP_CHAT_CREATED:
      return Object.assign(
        {},
        state,
        {
          isCreating: false,
          errors: defaultChat.errors,
          createdChatId: action.chatId
        }
      )
    case FAILED_TO_CREATE_GROUP_CHAT:
      return Object.assign(
        {},
        state,
        {
          isCreating: false,
          errors: action.errors,
          createdChatId: null
        }
      )
    case ATTEMPT_TO_CREATE_GROUP_CHAT:
      return Object.assign(
        {},
        state,
        {
          isCreating: true,
          errors: defaultChat.errors,
          createdChatId: null
        }
      )
    default:
      return state
  }
}

export default chat
