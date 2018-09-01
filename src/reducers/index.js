import { combineReducers } from 'redux'
import chat from './chat'
import currentChat from './currentChat'
import search from './search'
import user from './user'

export default combineReducers({
  chat,
  search,
  user,
  currentChat
})
