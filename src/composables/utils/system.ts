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
