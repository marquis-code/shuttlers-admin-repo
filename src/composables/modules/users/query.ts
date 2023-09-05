import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useQueryUsers = () => {
    const loadingQueriedUsers = ref(false)
    const queriedUsers = ref([] as any)

    const { $_query_users } = users_api

    const queryUsers = async (query: string) => {
        loadingQueriedUsers.value = true
        const res = await $_query_users(query) as CustomAxiosResponse

        if (res.type !== 'Error') {
            queriedUsers.value = res.data.data
        }
        loadingQueriedUsers.value = false
    }

    return { queryUsers, loadingQueriedUsers, queriedUsers }
}
