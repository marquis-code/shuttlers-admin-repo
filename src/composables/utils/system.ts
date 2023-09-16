export const appendObjectToCurrentURL = (key, value) => {
      let url = window.location.href
      let queryString = ''
      const hasQueryString = url.includes('?')
      if (hasQueryString) {
        const [baseUrl, existingQueryString] = url.split('?')
        const params = new URLSearchParams(existingQueryString)
        if (params.has(key)) {
          params.delete(key)
        }
        queryString = params.toString()
        if (queryString.length > 0) {
          queryString += '&'
        }
      }
      if (value) {
        queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value)
      }
      url = hasQueryString ? url.split('?')[0] + '?' + queryString : url + '?' + queryString
      window.history.replaceState(null, null, url)
    }

export const insertScriptTag = (url: string): void => {
  if (process.server) return
  if (process.client && document.head.querySelectorAll(`script[src="${url}"]`).length > 0) return
  const scriptTag = document.createElement('script')
  scriptTag.src = url
  document.body.appendChild(scriptTag)
}
