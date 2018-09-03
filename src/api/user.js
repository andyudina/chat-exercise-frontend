import { SERVER_API_URL } from 'app-constants'
import { thisFieldIsRequiredError } from 'api/error'
import { get, put } from 'api/request'
import { createUrl, createUrlWithParams } from 'api/url'

const BASE_USER_API_URL = createUrl(SERVER_API_URL, 'users')

export const getCurrentUserApi = () => {
  const url = createUrl(BASE_USER_API_URL, 'self')
  return get({ url })
}

export const updateNicknameApi = (nickname) => {
  if (!(nickname)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('nickname') })
  }
  const url = createUrl(BASE_USER_API_URL, 'self')
  const body = { nickname }
  return put({ url, body })
}

export const retrieveUserChatsApi = () => {
  const url = createUrl(BASE_USER_API_URL, 'self', 'chats')
  return get({ url })
}

export const searchUsersApi = (nickname) => {
  if (!(nickname)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('nickname') })
  }
  const url = createUrlWithParams(
    BASE_USER_API_URL,
    {
      nickname: nickname
    })
  return get({ url })
}
