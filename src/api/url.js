export const createUrl = (...args) => {
  return args.join('/')
}

export const createUrlWithParams = (url, getParams) => {
  url += '?'
  const getParamStr = Object
    .keys(getParams)
    .map(key => [key, getParams[key]].join('='))
    .join('&')
  return url + getParamStr
}
