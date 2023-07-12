import { useUser } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/useNotification'
import { auth_api } from '@/api_factory/modules/auth'
export const use_auth_forgot_password = () => {
	const Router = useRouter()
	const credential = {
		email: ref('')
	}

	const loading = ref(false)
	const auth_type = ref<'email' | 'phone'>('email')

	const disabled = computed({
		get: () => {
			if (credential.email.value === '' || !credential.email.value.includes('@')) return true
			 return false
		},
		set: () => { }
	})

	const forgot_password = async () => {
		loading.value = true
		const res = (await auth_api.$_forgot_password({
			email: credential.email.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			Router.push('/auth/forgot-done?email=' + credential.email.value)
		}
	}

	return { credential, forgot_password, loading, disabled, auth_type }
}
