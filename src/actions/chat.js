import fetch from 'cross-fetch'

import { SERVER_API_URL } from '../app-constants'

import {
  createUrl,
  createUrlWithParams,
  unknownErrorOccurred,
  getErrors,
  thisFieldIsRequiredError } from './_utils'

const BASE_CHAT_API_URL = createUrl(SERVER_API_URL, 'chats')

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
    if (!(name)) {
      dispatch(
        searchChatsFailed(
          thisFieldIsRequiredError('name')
        )
      )
      return
    }
    dispatch(chatsSearchStarted())
    return fetch(
      createUrlWithParams(
        BASE_CHAT_API_URL,
        {
          name: name
        }
      ))
      .then(response => {
        // Needed to process response data and status
        // at the same time
        return response
          .json()
          .then(data => ({ status: response.status, data: data }))
      })
      .then(response => {
        if (response.status >= 400) {
          dispatch(
            searchChatsFailed(
              getErrors(response.status, response.data.errors)
            )
          )
          return
        }
        dispatch(chatsFound(response.data.chats))
      })
      .catch(err => {
        console.log(err)
        dispatch(
          searchChatsFailed(
            unknownErrorOccurred()
          )
        )
      })
  }
}
