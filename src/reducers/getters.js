import { DEFAULT_NICKNAME } from 'app-constants'

export const isTryingToJoinGroupChat = (chatId, state) => {
  return !!state.joinGroupChatState.isTrying[chatId]
}

export const failedToJoinGroupChat = (chatId, state) => {
  return !!state.joinGroupChatState.failed[chatId]
}

export const isTryingToStartPrivateChat = (userId, state) => {
  return !!state.startPrivateChatState.isTrying[userId]
}

export const failedToStartPrivateChat = (userId, state) => {
  return !!state.startPrivateChatState.failed[userId]
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

export const geCurrentUserChats = (state) => {
  return generateNameForPrivateChats(
    state.currentUserChats,
    state.currentUser._id)
}

export const getCurrentChatId = (state) => {
  if (!state.currentChat) { return null }
  return state.currentChat.chat._id
}
