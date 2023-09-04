import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

const selectedUser = ref({} as Record<string, any>)
const selectedUserId = ref('')

export const useUserIdDetails = () => {
    const loading = ref(false)

    const getUserById = async (id: string) => {
        selectedUserId.value = id
        loading.value = true
        const res = await users_api.$_get_user_by_id(id) as CustomAxiosResponse
        if (res.type !== 'Error') {
            selectedUser.value = res.data
        }
        loading.value = false
    }
    return { selectedUser, loading, getUserById }
}
