import { useStorage } from '@vueuse/core'
import { useUser } from '@/composables/auth/user'

const { token } = useUser()

export const appendObjectToCurrentURL = (key, value) => {
      let url = window.location.href
      let queryString = ''
      const hasQueryString = url.includes('?')
      if (hasQueryString) {
        const [baseUrl, existingQueryString] = url.split('?')
        const params = new URLSearchParams(existingQueryString)

        if (params.has(key) || value === '[]') {
          params.delete(key)
        }
        queryString = params.toString()
        if (queryString.length > 0) {
          queryString += '&'
        }
      }
      if (value && value !== '[]') {
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

export const environmental_url = {
  test: 'https://test.admin.shuttlers.africa',
  staging: 'https://qa.admin.shuttlers.africa',
  prod: 'https://admin.shuttlers.africa'
}

export const openAsExternalUrl = (url) => {
  const tokenValue = token.value
  switch (import.meta.env.VITE_ENV_ALIAS) {
    case 'test':
    case 'TEST':
      window.location.href = `${environmental_url.test}/redirect/?path=${url}&token=${tokenValue}`
      break
    case 'staging':
    case 'QA':
      window.location.href = `${environmental_url.staging}/redirect/?path=${url}&token=${tokenValue}`
      break
    case 'prod':
    case 'PROD':
      window.location.href = `${environmental_url.prod}/redirect/?path=${url}&token=${tokenValue}`
      break
    default:
      window.location.href = `${environmental_url.test}/redirect/?path=${url}&token=${tokenValue}`
      break
  }
}

export const is_dev = import.meta.env.DEV

export const shouldNotRedirectToExternalUrl = useStorage('shouldRedirectToExternalUrl', false)
