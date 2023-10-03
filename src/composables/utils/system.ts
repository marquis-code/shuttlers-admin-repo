import { useUser } from '@/composables/auth/user'
const { token } = useUser()

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

const environmental_url = {
  test: 'https://test.admin.shuttlers.africa',
  staging: 'https://qa.admin.shuttlers.africa',
  prod: 'https://admin.shuttlers.africa'
}

export const openAsExternalUrl = (url) => {
  const b64 = btoa(JSON.stringify(token.value))
  switch (process.env.ENV) {
    case 'test':
    case 'TEST':
      window.location.href = `${environmental_url.test}/redirect/?path=${url}&token=${b64}`
      break
    case 'staging':
    case 'STAG':
      window.location.href = `${environmental_url.staging}/redirect/?path=${url}&token=${b64}`
      break
    case 'prod':
    case 'PROD':
      window.location.href = `${environmental_url.prod}/redirect/?path=${url}&token=${b64}`
      break
    default:
      window.location.href = `${environmental_url.test}/redirect/?path=${url}&token=${b64}`
      break
  }
}
