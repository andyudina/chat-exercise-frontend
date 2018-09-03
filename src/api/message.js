import { SERVER_API_URL } from 'app-constants'
import { thisFieldIsRequiredError } from 'api/error'
import { get, post } from 'api/request'
import { createUrl, createUrlWithParams } from 'api/url'
import { isDate } from 'api/utils'

const BASE_MESSAGES_API_URL = createUrl(SERVER_API_URL, 'users', 'self', 'chats')

export const fetchChatApi = (chatId) => {
  if (!(chatId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('chat') })
  }
  const url = createUrl(BASE_MESSAGES_API_URL, chatId)
  return get({ url })
}

export const listMessagesApi = (chatId, page) => {
  if (!(chatId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('chat') })
  }
  if (!(page)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('page') })
  }
  const url = createUrlWithParams(
    createUrl(BASE_MESSAGES_API_URL, chatId, 'messages'),
    { page })
  return get({ url })
}

export const listNewMessagesApi = (chatId, date) => {
  if (!(chatId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('chat') })
  }
  if (!(date)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('date') })
  }
  if (!(isDate(date))) {
    return Promise.resolve({ errors: { date: 'Please use valid date' } })
  }
  const url = createUrlWithParams(
    createUrl(BASE_MESSAGES_API_URL, chatId, 'messages', 'new'),
    {
      date: date.toISOString()
    })
  return get({ url })
}

export const createMessageApi = (chatId, message) => {
  if (!(chatId)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('chat') })
  }
  if (!(message)) {
    return Promise.resolve({ errors: thisFieldIsRequiredError('message') })
  }
  const url = createUrl(BASE_MESSAGES_API_URL, chatId, 'messages')
  const body = { message }
  return post({ url, body })
}
