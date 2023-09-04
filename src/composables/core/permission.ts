import { useStorage } from '@vueuse/core'
import { useUser } from '../auth/user'
import { auth_api } from '@/api_factory/modules/auth'

export const currentUserPermission = useStorage('permissions', [] as any)

export const useUserPermission = () => {
    const fetchUserPermission = async() => {
        const res = await auth_api.$_get_permissions() as any

        if (res.type !== 'ERROR') {
            currentUserPermission.value = res.data.permissions
            useUser().updateUser(res.data.staff)
        }
    }

    return { fetchUserPermission, currentUserPermission }
}
