import HttpStatus from 'http-status-codes'

export const createUrl = (...args) => {
  return args.join('/')
}

const errorsArrayToObject = (errors) => {
  // translate errors, created by express-validator
  // format: [ { location, msg, param } ]
  // to object: { param: errorMessage }

  return Object.assign(
    {},
    ...errors.map(error => ({ [error.param]: error.msg }))
  )
}

// Generate error to display
// when we don't know exact reason of error
export const unknownErrorOccurred = () => ({
  general: 'Sorry, error occured. Please, tell me and I will fix it ASAP'
})

const accessDeniedErrorOccured = () => ({
  general: 'Sorry, seems like you are trying to do something forbidden'
})

export const thisFieldIsRequiredError = (field) => ({
  [field]: 'This field is required'
})

export const getErrors = (status, errors) => {
  // Format or replace errors according to status code
  if (status === HttpStatus.BAD_REQUEST && errors) {
    // Expect differently formated errors with bad request
    return errorsArrayToObject(errors)
  }
  if (errors) {
    return errors
  }
  if (
    (status === HttpStatus.FORBIDDEN) ||
    (status === HttpStatus.UNAUTHORIZED)) {
    return accessDeniedErrorOccured()
  }
  return unknownErrorOccurred()
}

export const createHeadersForJSONRequest = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

export const createUrlWithParams = (url, getParams) => {
  url += '?'
  const getParamStr = Object
    .keys(getParams)
    .map(key => [key, getParams[key]].join('='))
    .join('&')
  return url + getParamStr
}
