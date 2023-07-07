import axios from 'axios'
import { useAlert } from '@/composables/core/useNotification'
import { useUser } from '@/composables/auth/user'
const { token } = useUser()

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string
const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL + '/v1'
const $IMAGE_UPLOAD_ENDPOINT = import.meta.env.VITE_IMAGE_UPLOAD_BASE_URL as string

export const GATEWAY_ENDPOINT = axios.create({
	baseURL: $GATEWAY_ENDPOINT
})
export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
	baseURL: $GATEWAY_ENDPOINT,
	headers: {
		Authorization: `Bearer ${token.value}`
	}
})
export const GATEWAY_ENDPOINT_WITHOUT_VERSION = axios.create({
	baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION
})
export const GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH = axios.create({
	baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
	headers: {
		Authorization: `Bearer ${token.value}`
	}
})
export const IMAGE_UPLOAD_ENDPOINT = axios.create({
	baseURL: $IMAGE_UPLOAD_ENDPOINT
})

const instanceArray = [GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH]

instanceArray.forEach((instance) => {
	instance.interceptors.response.use(
	(response) => {
		return response
	},
	(err) => {
		if (typeof err.response === 'undefined') {
			useAlert().openAlert({ type: 'ERROR', msg: 'kindly check your network connection' })
			return 'ERROR'
		}
		if (err.response.status === 401) {
			useAlert().openAlert({ type: 'ERROR', msg: 'Unauthorised ERROR' })
			return 'ERROR'
		} else if (statusCodeStartsWith(err.response.status, 4)) {
			if (err.response.data.message) {
				useAlert().openAlert({ type: 'ERROR', msg: err.response.data.message })
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: err.response.data.error })
			}
			return 'ERROR'
		} else if (err.response.status === 500) {
			useAlert().openAlert({ type: 'ERROR', msg: err.response.data.message })
			return 'ERROR'
		} else if (err.response.status === 409) {
			useAlert().openAlert({ type: 'ERROR', msg: err.response.data.message })
		}
	}
)
})

const statusCodeStartsWith = (statusCode: number, startNumber: number): boolean => {
  const statusCodeString = statusCode.toString()
  const startNumberString = startNumber.toString()

  return statusCodeString.startsWith(startNumberString)
}
