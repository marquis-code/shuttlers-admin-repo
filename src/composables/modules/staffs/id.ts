import { staffs_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedAdmin = ref({} as Record<string, any>)
const selectedAdminId = ref('')

export const useAdminIdDetails = () => {
    const loading = ref(false)

    const getAdminById = async (id: string) => {
        selectedAdminId.value = id
        loading.value = true
        const res = await staffs_api.$_get_staff_details_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedAdmin.value = res.data
        }
        loading.value = false
        return res.data
    }
    return { selectedAdmin, loading, getAdminById }
}

export const useAdminPermissionsById = () => {
    const loading = ref(false)
    const adminPermissionsList = ref([] as any)
    const getAdminPermissionsById = async (id: string) => {
        selectedAdminId.value = id
        loading.value = true
        const res = await staffs_api.$_get_staff_details_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            adminPermissionsList.value = res.data.data
        }
        loading.value = false
        return res.data
    }
    return { adminPermissionsList, loading, getAdminPermissionsById }
}
