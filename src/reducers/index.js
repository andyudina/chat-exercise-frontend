// Domain logic
import currentChat from 'reducers/domain-data/currentChat'
import currentUserChats from 'reducers/domain-data/currentUserChats'
import searchChatResults from 'reducers/domain-data/searchChatResults'
import searchUserResults from 'reducers/domain-data/searchUserResults'
import currentUser from 'reducers/domain-data/currentUser'

// App state
import changeNicknameState from 'reducers/app-state/changeNicknameState'
import createChatState from 'reducers/app-state/createChatState'
import currentChatLoadingState from 'reducers/app-state/currentChatLoadingState'
import currentUserState from 'reducers/app-state/currentUserState'
import joinGroupChatState from 'reducers/app-state/joinGroupChatState'
import searchState from 'reducers/app-state/searchState'
import sendMessageState from 'reducers/app-state/sendMessageState'
import startPrivateChatState from 'reducers/app-state/startPrivateChatState'
import userNickname from 'reducers/app-state/userNickname'

export default {
  // Domain logic
  currentChat,
  currentUserChats,
  searchChatResults,
  searchUserResults,
  currentUser,
  // App state
  changeNicknameState,
  createChatState,
  currentChatLoadingState,
  currentUserState,
  joinGroupChatState,
  searchState,
  sendMessageState,
  startPrivateChatState,
  userNickname
}
