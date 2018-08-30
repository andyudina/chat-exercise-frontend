import fetch from 'cross-fetch'

import { SERVER_API_URL } from '../app-constants'

import {
  createUrl,
  unknownErrorOccurred,
  getErrors,
  createHeadersForJSONRequest,
  thisFieldIsRequiredError } from './_utils'

/*

  Get current user

*/

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const RETRIEVE_CURRENT_USER_FAILED = 'RETRIEVE_CURRENT_USER_FAILED'

const BASE_USER_API_URL = createUrl(SERVER_API_URL, 'users')

const receiveCurrentUser = (json) => {
  return {
    user: json,
    type: RECEIVE_USER_INFO
  }
}

const retrieveCurrentUserFailed = () => {
  return {
    type: RETRIEVE_CURRENT_USER_FAILED
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    return fetch(
      createUrl(BASE_USER_API_URL, 'self'))
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Failed to fecth current user')
        }
        return response.json()
      })
      .then(json => dispatch(receiveCurrentUser(json)))
      .catch(err => {
        console.log(err)
        dispatch(retrieveCurrentUserFailed())
      })
  }
}

/*

  Update nickname

*/

export const NICKNAME_UPDATE_STARTED = 'NICKNAME_UPDATE_STARTED'
export const NICKNAME_UPDATED = 'NICKNAME_UPDATED'
export const NICKNAME_UPDATE_FAILED = 'NICKNAME_UPDATE_FAILED'

const nicknameUpdateStarted = () => ({
  type: NICKNAME_UPDATE_STARTED
})

const nicknameUpdateSucceeded = (nickname) => {
  return {
    nickname: nickname,
    type: NICKNAME_UPDATED
  }
}

const nicknameUpdateFailed = (errors) => {
  return {
    errors: errors,
    type: NICKNAME_UPDATE_FAILED
  }
}

export const updateNickname = (nickname) => {
  return (dispatch) => {
    if (!(nickname)) {
      dispatch(
        nicknameUpdateFailed(
          thisFieldIsRequiredError('nickname')
        )
      )
      return
    }
    dispatch(nicknameUpdateStarted())
    return fetch(
      createUrl(BASE_USER_API_URL, 'self'),
      {
        method: 'PUT',
        headers: createHeadersForJSONRequest(),
        body: JSON.stringify({
          nickname: nickname
        })
      })
      .then(response => {
        // Needed to process response data and status
        // at the same time
        return response
          .json()
          .then(data => ({ status: response.status, data: data }))
      })
      .then(response => {
        if (response.status > 400) {
          dispatch(
            nicknameUpdateFailed(
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(nicknameUpdateSucceeded(response.data.nickname))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          nicknameUpdateFailed(
            unknownErrorOccurred()
          )
        )
      })
  }
}
