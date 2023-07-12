import { useUser, REDIRECT_URL } from '../user'
import { use_auth_login } from './login'
import { useAlert } from '@/composables/core/useNotification'
import { auth_api } from '@/api_factory/modules/auth'

export const use_confirm_otp = () => {
	const Router = useRouter()
	const credential = {
		id: ref(''),
		otp: ref('')
	}

	const auth_type = ref<'email' | 'phone'>('email')
	const loading = ref(false)

	const disabled = computed({
		get: () => {
			if (credential.id.value === '' || credential.otp.value.length < 4) return true
			 return false
		},
		set: () => { }
	})

	const resend_otp = async () => {
		loading.value = true
		await use_auth_login().sign_in_with_otp()
		useAlert().openAlert({ type: 'SUCCESS', msg: 'OTP resent successfully' })
		loading.value = false
	}

	const confirm_otp = async () => {
		loading.value = true
		const res = (await auth_api.$_confirm_otp({
			id: credential.id.value,
			otp_code: credential.otp.value
		})) as any

		loading.value = false
		if (res !== 'ERROR') {
				await useUser().createUser(res.data)
				location.assign('/dashboard')
		}
	}

	return { credential, confirm_otp, loading, disabled, resend_otp }
}
