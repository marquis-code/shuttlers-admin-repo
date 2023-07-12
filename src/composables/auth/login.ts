import { useUser, REDIRECT_URL } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/useNotification'
import { auth_api } from '@/api_factory/modules/auth'

	const credential = {
		email: ref(''),
		phone: ref<{phone:string, country_code:string}>({ phone: '', country_code: 'NG' }),
		password: ref('')

	}

export const use_auth_login = () => {
	const Router = useRouter()

	const loading = ref(false)
	const auth_type = ref<'email' | 'phone'>('email')

	const disabled = computed({
		get: () => {
			if (credential.email.value !== '' && !credential.email.value.includes('@')) return true
			if (credential.phone.value.phone !== '' && credential.phone.value.phone.length <= 8) return true
			if (credential.password.value === '') return true
			 return false
		},
		set: () => { }
	})

	const login = async () => {
		loading.value = true
		let res
		if (auth_type.value === 'email') {
			 res = (await auth_api.$_login({
			email: credential.email.value,
			password: credential.password.value,
			type: 'staff'
		})) as any
		} else {
			 res = (await auth_api.$_login({
			...credential.phone.value,
			password: credential.password.value,
			type: 'staff'
		})) as any
		}

		loading.value = false
		if (res.type !== 'ERROR') {
			await useUser().createUser(res.data)
			const redirectUrl = useUser().redirect.value
			useUser().redirect.value = null
			location.assign(redirectUrl ?? '/dashboard')
		}
	}

	const sign_in_with_otp = async () => {
		if (auth_type.value === 'email' && (credential.email.value === '' || !credential.email.value.includes('@'))) return useAlert().openAlert({ type: 'ERROR', msg: 'Please enter a valid email address' })
		if (auth_type.value === 'phone' && (credential.phone.value.phone.length <= 8)) return useAlert().openAlert({ type: 'ERROR', msg: 'Please enter a valid phone number' })
		loading.value = true

			let res
		if (auth_type.value === 'email') {
			 res = (await auth_api.$_otp_login({
				 email: credential.email.value,
				 type: 'staff'
		})) as any
		} else {
			 res = (await auth_api.$_otp_login({
				 ...credential.phone.value,
				 type: 'staff'
		})) as any
		}

		loading.value = false
		if (res.type !== 'ERROR') {
			if (auth_type.value === 'email') Router.push(`/auth/confirm?id=${res.data.reference_id}&type=email&value=${credential.email.value}`)
			else Router.push(`/auth/confirm?id=${res.data.reference_id}&type=${auth_type.value}&value=${credential.phone.value.phone}&country_code=${credential.phone.value.country_code}`)
		}
	}

	return { credential, login, loading, disabled, auth_type, sign_in_with_otp }
}
