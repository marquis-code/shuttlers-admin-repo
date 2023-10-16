import axios, { AxiosResponse } from 'axios'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

const { token, logOut } = useUser()

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string
const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL + '/v1'
const $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE = import.meta.env.VITE_BASE_URL + '/cost-revenue/v1'
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

export const $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API = axios.create({
	baseURL: $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE,
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
export interface CustomAxiosResponse extends AxiosResponse {
  value?: any
  type?: string;
}

const instanceArray = [GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH, $GATEWAY_ENDPOINT_WITH_AUTH_WITH_COST_REVENUE_SERVICE_API]

instanceArray.forEach((instance) => {
	instance.interceptors.request.use(
		(config) => {
			if (token.value) {
				config.headers.Authorization = `Bearer ${token.value}`
			}
			return config
		}
	)

	instance.interceptors.response.use(
	(response:CustomAxiosResponse) => {
		return response
	},
	(err:any) => {
		if (typeof err.response === 'undefined') {
			useAlert().openAlert({ type: 'ERROR', msg: 'kindly check your network connection' })
			return {
				type: 'ERROR',
				...err.response
			}
		}
		if (err.response.status === 401) {
			logOut()
			useAlert().openAlert({ type: 'ERROR', msg: 'Unauthorised ERROR' })
			return {
				type: 'ERROR',
				...err.response
			}
		} else if (statusCodeStartsWith(err.response.status, 4)) {
			if (err.response.data.message) {
				useAlert().openAlert({ type: 'ERROR', msg: err.response.data.message })
			} else {
				useAlert().openAlert({ type: 'ERROR', msg: err.response.data.error })
			}
			return {
				type: 'ERROR',
				...err.response
			}
		} else if (err.response.status === 500) {
			useAlert().openAlert({ type: 'ERROR', msg: err.response.data.message })
			return {
				type: 'ERROR',
				...err.response
			}
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
