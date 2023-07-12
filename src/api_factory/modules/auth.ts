import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITHOUT_VERSION, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config'
import { useUser } from '@/composables/auth/user'

const { user } = useUser()

export const auth_api = {
	 $_register: (credential: any) => {
		const url = '/users'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_update_password: (credential: any) => {
		const url = `/users/${user.value.id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, credential)
	},
	$_login: (credential: any) => {
		const url = '/login'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_forgot_password: (credential: any) => {
		const url = '/password'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_reset_password: (credential: any) => {
		const url = '/password/change'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_otp_login: (credential: any) => {
		const url = '/otp-login'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_confirm_otp: (credential: any) => {
		const url = `/otp-login/${credential.id}`
		return GATEWAY_ENDPOINT.patch(url, credential)
	},
	$_verify_phone: (credential: any) => {
		const url = `/users/exists?phone=${credential.phone}&country_code=${credential.country_code}`
		return GATEWAY_ENDPOINT.get(url)
	},
	$_verify_email: (email:any) => {
		const url = `/users/exists?email=${email}`
		return GATEWAY_ENDPOINT.get(url)
	},
	$_send_otp: (credential: any) => {
		const url = '/otp/v1'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION.post(url, credential)
	},
	$_verify_otp: (credential: any) => {
		const url = '/otp/v1'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION.put(url, credential)
	},
	$_fetch_cities: (credential: any) => {
		const url = '/city?fields[city]=id,name'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url, credential)
	},
	$_social_signin: (credential: any) => {
		const url = '/social-signin'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_guess_login: (credential: any) => {
        const url = '/guests'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, credential)
	},
	$_get_permissions: () => {
		const url = `/super-admin/staff-module-permissions/staff/${user.value.id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}

}
