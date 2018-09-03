
import {
  RECEIVE_USER_INFO,
  NICKNAME_UPDATED } from 'actions/user'

import { DEFAULT_NICKNAME } from 'app-constants'

const defaultNickname = DEFAULT_NICKNAME

const nickname = (state = defaultNickname, action) => {
  switch (action.type) {
    // Get current user
    case RECEIVE_USER_INFO:
      return action.user.nickname
    case NICKNAME_UPDATED:
      return action.nickname
    default:
      return state
  }
}

export default nickname
