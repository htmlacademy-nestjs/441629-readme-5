export const createQuery = (query) => {
  let queryLine = '';

  if (query) {
    const arr = []
    queryLine = '?'

    for (let key in query) {
      if (Array.isArray(query[key])) {
        arr.push(`${key}[]=${query[key].join(',')}`)
      } else {
        arr.push(`${key}=${query[key]}`)
      }
    }

    queryLine += arr.join('&')
  }

  return queryLine;
}
