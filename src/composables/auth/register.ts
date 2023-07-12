import { useUser, REDIRECT_URL } from '@/composables/auth/user'
import { auth_api } from '@/api_factory/modules/auth'
import { useAlert } from '@/composables/core/useNotification'

const credential = {
	first_name: ref(''),
	last_name: ref(''),
	city: ref(''),
	city_id: ref('') as any,
	phone: ref<{ phone: string, country_code: string }>({ phone: '', country_code: 'NG' }),
	email: ref(''),
	password: ref(''),
	c_password: ref(''),
	id: ref(''),
	otp: ref(''),
	agreement: ref(false)
}

const step = ref(1)

export const use_auth_register = () => {
	const Router = useRouter()
	const loading = ref(false)

	const disabled = computed({
		get: () => {
			if (credential.agreement.value === false) return true
			else return false
		}, set: () => { }
	})

	const register = async () => {
		loading.value = true
		const res = (await auth_api.$_register({
			fname: credential.first_name.value,
			city_id: credential.city_id.value,
			lname: credential.last_name.value,
			email: credential.email.value,
			...credential.phone.value,
			password: credential.password.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			await useUser().createUser(res.data)
			location.assign('/dashboard')
		}
	}

	return { credential, register, loading, step, disabled }
}

export const use_user_city = () => {
	const loading = ref(false)
	const c_password_err = ref('')
	const cityArray = ref([] as any)
	watch(credential.c_password, (value) => {
		if (value === '') { c_password_err.value = ''; return }
		if (value !== credential.password.value) {
			c_password_err.value = 'password does not match'
		} else {
			c_password_err.value = ''
		}
	})
	const disabled = computed({
		get: () => {
			if (credential.city_id.value === '') return true
			else return false
		}, set: () => { }
	})
	const fetchCities = async () => {
		loading.value = true
		const res = (await auth_api.$_fetch_cities({})) as any
		cityArray.value = res.data.data
		credential.city_id.value = 25
		loading.value = false
	}
	return { credential, disabled, step, cityArray, fetchCities, loading }
}

export const use_user_info = () => {
	const c_password_err = ref('')
	watch(credential.c_password, (value) => {
		if (value === '') { c_password_err.value = ''; return }
		if (value !== credential.password.value) {
			c_password_err.value = 'password does not match'
		} else {
			c_password_err.value = ''
		}
	})
	const disabled = computed({
		get: () => {
			if (
				credential.email.value === '' ||
				credential.password.value === '' || credential.password.value !== credential.c_password.value ||
				credential.c_password.value === '' ||
				!credential.email.value.includes('@') ||
				credential.first_name.value === '' ||
				credential.last_name.value === ''
			)
				return true
			else return false
		},
		set: () => { }
	})
	return { credential, disabled, step, c_password_err }
}
export const use_register_confirm_otp = () => {
	const Router = useRouter()

	const auth_type = ref<'email' | 'phone'>('email')
	const loading = ref(false)

	const disabled = computed({
		get: () => {
			if (credential.id.value === '' || credential.otp.value.length < 4) return true
			return false
		},
		set: () => { }
	})

	const send_otp = async () => {
		loading.value = true

		const res = (await auth_api.$_send_otp({
			...credential.phone.value,
			user_id: 0
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			credential.id.value = res.data.id
		}
	}

	const confirm_otp = async () => {
		loading.value = true
		const res = (await auth_api.$_verify_otp({
			otp_code: credential.otp.value,
			id: credential.id.value
		})) as any
		loading.value = false
		if (res.type !== 'ERROR') {
			step.value = 3
		}
	}

	return { credential, confirm_otp, loading, disabled, send_otp, step }
}

export const use_verify_phone = () => {
	const loading = ref(false)
	const disabled = computed({
		get: () => {
			if (credential.phone.value.phone === '' || credential.phone.value.phone.length <= 8) return true
			return false
		},
		set: () => { }
	})

	const verify = async () => {
		loading.value = true
		const res = (await auth_api.$_verify_phone({
			...credential.phone.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			if (res.data.exists) {
				useAlert().openAlert({ type: 'ERROR', msg: 'Phone number already exists' })
			} else {
				step.value = 2
			}
		}
	}

	return { credential, verify, loading, disabled }
}
