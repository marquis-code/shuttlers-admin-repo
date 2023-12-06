import { useStorage } from '@vueuse/core'
import { useUser } from '../auth/user'
import { auth_api } from '@/api_factory/modules/auth'

 const currentUserPermission = useStorage('permissions', [] as any)

const currentUserPermissionModuleCode = computed(() => {
    return currentUserPermission.value.map((permission: any) => permission.module_code)
})

export const useUserPermission = () => {
    const fetchUserPermission = async() => {
        const res = await auth_api.$_get_permissions() as any

        if (res.type !== 'ERROR') {
            currentUserPermission.value = res.data.permissions
            useUser().updateUser(res.data.staff)
        }
    }

    return { fetchUserPermission, currentUserPermission, currentUserPermissionModuleCode }
}
