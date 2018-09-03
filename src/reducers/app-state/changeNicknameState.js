
import {
  NICKNAME_UPDATE_STARTED,
  NICKNAME_UPDATED,
  NICKNAME_UPDATE_FAILED } from 'actions/user'

const defaultUser = {
  isUpdating: false,
  errors: {
    general: null,
    nickname: null
  }
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    // Update user nickname
    case NICKNAME_UPDATE_STARTED:
      return Object.assign(
        {},
        state,
        {
          isUpdating: true
        }
      )
    case NICKNAME_UPDATED:
      return Object.assign(
        {},
        state,
        {
          isUpdating: false,
          errors: Object.assign(
            {},
            defaultUser.errors
          )
        }
      )
    case NICKNAME_UPDATE_FAILED:
      return Object.assign(
        {},
        state,
        {
          isUpdating: false,
          errors: Object.assign(
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
