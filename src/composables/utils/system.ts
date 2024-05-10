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
      window.history.replaceState(null, 'null', url)
    }

export const insertScriptTag = (url: string): void => {
  if (process.server) return
  if (process.client && document.head.querySelectorAll(`script[src="${url}"]`).length > 0) return
  const scriptTag = document.createElement('script')
  scriptTag.src = url
  document.head.appendChild(scriptTag)
}

export const environmental_url = {
  test: 'https://v2.test.admin.shuttlers.africa',
  staging: 'https://v2.qa.admin.shuttlers.africa',
  prod: 'https://v2.admin.shuttlers.africa'
}

export const customer_web_app_url = {
  test: 'https://test.my.shuttlers.africa',
  staging: 'https://qa.my.shuttlers.africa',
  prod: 'https://my.shuttlers.africa'
}

export const isProdEnv = computed(() => {
  if (window.location.href.includes('test') || window.location.href.includes('localhost') || window.location.href.includes('qa')) return false
  return true
})

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

export const removeDuplicates = (array, key) => {
  return array.filter((obj, index, self) =>
    index === self.findIndex((el) => el[key] === obj[key])
  )
}

export const useSidebar = () => {
  const showSidebar = () => {
    const sidebar = document.querySelector('#sidebar')
    console.log(sidebar)
  }
 return { showSidebar }
}
