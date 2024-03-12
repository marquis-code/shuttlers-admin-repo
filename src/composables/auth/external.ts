import jwt_decode from 'jwt-decode'
import { useUser, REDIRECT_URL } from '../auth/user'
import { useAlert } from '@/composables/core/notification'
import { auth_api } from '@/api_factory/modules/auth'

const error = ref('')

export const useSignInUserExternally = () => {
    const sign_user_in = async (token: string, redirect = '/dashboard/events/manage/upcoming') => {
        const { updateUser, setToken } = useUser()
        error.value = ''
        if (!token) {
            error.value = 'Missing token'
            return
        }
        await setToken(token)
        const decoded = jwt_decode(token)

            updateUser(decoded)
            useRouter().push(redirect)

        // const res = await auth_api.$_getUserProfile() as any

        // if (res !== 'ERROR') {
            // updateUser(res.data)
            // useRouter().push(redirect)
        // } else {
        //     error.value = 'Unable to fetch user profile'
        // }
    }

    return { sign_user_in, error }
}
