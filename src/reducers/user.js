import {
  RECEIVE_USER_INFO,
  RETRIEVE_CURRENT_USER_FAILED,

  NICKNAME_UPDATE_STARTED,
  NICKNAME_UPDATED,
  NICKNAME_UPDATE_FAILED } from '../actions/user'

const defaultUser = {
  isAuthenticated: null,
  isUserLoaded: false,
  user: null,

  isNicknameUpdating: false,
  nicknameUpdateErrors: {
    general: null,
    nickname: null
  }
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    // Get current user
    case RECEIVE_USER_INFO:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: true,
          isUserLoaded: true,
          user: action.user
        }
      )
    case RETRIEVE_CURRENT_USER_FAILED:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: false,
          isUserLoaded: true,
          user: null
        }
      )
    // Update user nickname
    case NICKNAME_UPDATE_STARTED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: true
        }
      )
    case NICKNAME_UPDATED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: false,
          nicknameUpdateErrors: Object.assign(
            {},
            defaultUser.nicknameUpdateErrors
          ),
          user: Object.assign(
            {},
            state.user,
            { nickname: action.nickname }
          )
        }
      )
    case NICKNAME_UPDATE_FAILED:
      return Object.assign(
        {},
        state,
        {
          isNicknameUpdating: false,
          nicknameUpdateErrors: Object.assign(
            {},
            defaultUser.nicknameUpdateErrors,
            action.errors
          )
        }
      )
    default:
      return state
  }
}

export default user
