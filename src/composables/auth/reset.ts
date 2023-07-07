import { useUser } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/useNotification'
import { auth_api } from '@/api_factory/modules/auth'

export const use_auth_reset_password = () => {
    const Router = useRouter()
    const credential = {
        password: ref(''),
        confirm_password: ref(''),
        token: ref(''),
        type: ref('')
    }

    const loading = ref(false)
    const auth_type = ref<'email' | 'phone'>('email')

    const disabled = computed({
        get: () => {
            if (credential.password.value === '' || credential.confirm_password.value === '') return true
            return false
        },
        set: () => { }
    })

    const reset_password = async () => {
        if (credential.password.value !== credential.confirm_password.value) return useAlert().openAlert({ type: 'ERROR', msg: 'Password and confirm password must be the same' })
        loading.value = true
        const res = (await auth_api.$_reset_password({
            password: credential.password.value,
            confirm_password: credential.confirm_password.value,
            token: credential.token.value,
            type: credential.type.value
        })) as any
        loading.value = false
        if (res !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Password reset successfully' })
            useRouter().push('/auth/login')
        }
    }

    return { credential, reset_password, loading, disabled, auth_type }
}
