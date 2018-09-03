import fetch from 'cross-fetch'

import { getErrors, unknownErrorOccurred } from 'api/error'

const _fetch = (...args) => {
  // Fetch and return Promise with json response and status code
  return fetch(...args)
    .then(response => {
      // Needed to process response data and status
      // at the same time
      return response
        .json()
        .then(data => ({ status: response.status, data: data }))
    })
    .then(response => {
      if (response.status >= 400) {
        return { errors: getErrors(response.status, response.data.errors) }
      }
      return { response: response.data }
    })
    .catch(error => {
      console.log(error)
      return { errors: unknownErrorOccurred() }
    })
}

const createHeadersForJSONRequest = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

export const get = ({ url, headers }) => {
  return _fetch(
    url,
    {
      method: 'GET',
      headers: { ...headers, ...createHeadersForJSONRequest() }
    }
  )
}

export const post = ({ url, headers, body }) => {
  return _fetch(
    url,
    {
      method: 'POST',
      headers: { ...headers, ...createHeadersForJSONRequest() },
      body: JSON.stringify({ ...body })
    }
  )
}

export const put = ({ url, headers, body }) => {
  return _fetch(
    url,
    {
      method: 'PUT',
      headers: { ...headers, ...createHeadersForJSONRequest() },
      body: JSON.stringify({ ...body })
    }
  )
}
