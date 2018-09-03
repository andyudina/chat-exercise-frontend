export const isDate = (date) => {
  return Object.prototype.toString.call(date) === '[object Date]'
}
