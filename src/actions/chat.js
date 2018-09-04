import { push } from 'connected-react-router'

import {
  searchChatsApi,
  joinChatApi,
  createPrivateChatApi,
  createGroupChatApi } from 'api/chat'

/*

  Search chat by name

*/

export const CHATS_FOUND = 'CHATS_FOUND'
export const SEARCH_CHATS_FAILED = 'SEARCH_CHATS_FAILED'
export const START_CHATS_SEARCH = 'START_CHATS_SEARCH'

const chatsFound = (chats) => {
  return {
    chats: chats,
    type: CHATS_FOUND
  }
}

const searchChatsFailed = (errors) => {
  return {
    errors: errors,
    type: SEARCH_CHATS_FAILED
  }
}

const chatsSearchStarted = () => {
  return {
    type: START_CHATS_SEARCH
  }
}

export const searchChats = (name) => {
  return (dispatch) => {
    dispatch(chatsSearchStarted())
    searchChatsApi(name)
      .then(({ errors, response }) => {
        if (errors) { dispatch(searchChatsFailed(errors)) }
        else { dispatch(chatsFound(response.chats)) }
      })
  }
}

/*

  Join group chat

*/

export const JOINED_CHAT = 'JOINED_CHAT'
export const FAILED_TO_JOIN_CHAT = 'FAILED_TO_JOIN_CHAT'
export const ATTEMPT_TO_JOIN_CHAT = 'ATTEMPT_TO_JOIN_CHAT'

const chatJoined = (chatId) => {
  return {
    chatId: chatId,
    type: JOINED_CHAT
  }
}

const failedToJoinChat = (chatId) => {
  return {
    chatId: chatId,
    type: FAILED_TO_JOIN_CHAT
  }
}

const attemptToJoinChat = (chatId) => {
  return {
    chatId: chatId,
    type: ATTEMPT_TO_JOIN_CHAT
  }
}

export const joinChat = (chatId) => {
  return (dispatch) => {
    dispatch(attemptToJoinChat(chatId))
    joinChatApi(chatId)
      .then(({ errors, response }) => {
        if (errors) { dispatch(failedToJoinChat(chatId)) }
        else {
          dispatch(chatJoined(chatId))
          dispatch(push('/chat/' + chatId))
        }
      })
  }
}

/*

  Start private chat with user

*/

export const PRIVATE_CHAT_CREATED = 'PRIVATE_CHAT_CREATED'
export const FAILED_TO_CREATE_PRIVATE_CHAT = 'FAILED_TO_CREATE_PRIVATE_CHAT'
export const ATTEMPT_TO_CREATE_PRIVATE_CHAT = 'ATTEMPT_TO_CREATE_PRIVATE_CHAT'

const privateChatCreated = (userId, chatId) => {
  return {
    userId: userId,
    chatId: chatId,
    type: PRIVATE_CHAT_CREATED
  }
}

const failedToCreatePrivateChat = (userId) => {
  return {
    userId: userId,
    type: FAILED_TO_CREATE_PRIVATE_CHAT
  }
}

const attemptToCreatePrivateChat = (userId) => {
  return {
    userId: userId,
    type: ATTEMPT_TO_CREATE_PRIVATE_CHAT
  }
}

export const createPrivateChat = (userId) => {
  return (dispatch) => {
    dispatch(attemptToCreatePrivateChat(userId))
    createPrivateChatApi(userId)
      .then(({ errors, response }) => {
        if (errors) { dispatch(failedToCreatePrivateChat(userId)) }
        else {
          dispatch(privateChatCreated(userId, response._id))
          dispatch(push('/chat/' + response._id))
        }
      })
  }
}

/*

  Create group chat

*/

export const GROUP_CHAT_CREATED = 'GROUP_CHAT_CREATED'
export const FAILED_TO_CREATE_GROUP_CHAT = 'FAILED_TO_CREATE_GROUP_CHAT'
export const ATTEMPT_TO_CREATE_GROUP_CHAT = 'ATTEMPT_TO_CREATE_GROUP_CHAT'

const groupChatCreated = (chatId) => {
  return {
    chatId: chatId,
    type: GROUP_CHAT_CREATED
  }
}

const failedToCreateGroupChat = (errors) => {
  return {
    errors: errors,
    type: FAILED_TO_CREATE_GROUP_CHAT
  }
}

const attemptToCreateGroupChat = (userId) => {
  return {
    type: ATTEMPT_TO_CREATE_GROUP_CHAT
  }
}

export const createGroupChat = (name) => {
  return (dispatch) => {
    dispatch(attemptToCreateGroupChat())
    createGroupChatApi(name)
      .then(({ errors, response }) => {
        if (errors) { dispatch(failedToCreateGroupChat(errors)) }
        else {
          dispatch(groupChatCreated(response._id))
          dispatch(push('/chat/' + response._id))
        }
      })
  }
}
