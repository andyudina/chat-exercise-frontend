import { SERVER_API_URL } from 'app-constants'
import { thisFieldIsRequiredError } from 'api/error'
import { get, put, post } from 'api/request'
import { createUrl, createUrlWithParams } from 'api/url'

const BASE_CHAT_API_URL = createUrl(SERVER_API_URL, 'chats')

export const searchChatsApi = (name) => {
  if (!(name)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('name') })
  }
  const url = createUrlWithParams(
    BASE_CHAT_API_URL,
    { name: name }
  )
  return get({ url })
}

export const joinChatApi = (chatId) => {
  if (!(chatId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('chat') })
  }
  const url = createUrl(BASE_CHAT_API_URL, chatId)
  return put({ url })
}

export const createPrivateChatApi = (userId) => {
  if (!(userId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('user') })
  }
  const body = { user: userId }
  const url = createUrl(BASE_CHAT_API_URL, 'private')
  return post({ body, url })
}

export const createGroupChatApi = (name) => {
  if (!(name)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('name') })
  }
  const body = { name: name }
  const url = createUrl(BASE_CHAT_API_URL, 'group')
  return post({ body, url })
}
