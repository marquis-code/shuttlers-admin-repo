import { users_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRecentSignupsList = () => {
    const loadingSignups = ref(false)
    const signupList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_users } = users_api

    const getSignupList = async () => {
        loadingSignups.value = true
        metaObject.page_size.value = 5
        const res = await $_get_users(metaObject) as CustomAxiosResponse

        if (res.type !== 'Error') {
            signupList.value = res.data.data
        }
        loadingSignups.value = false
    }

    return { getSignupList, loadingSignups, signupList }
}

export const useGetUsersList = () => {
    const loading = ref(false)
    const usersList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_users } = users_api

    const getUsersList = async () => {
        loading.value = true

        const res = await $_get_users(metaObject) as CustomAxiosResponse

        if (res.type !== 'Error') {
            usersList.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getUsersList)

    return { getUsersList, loading, usersList, moveTo, ...metaObject, next, prev }
}
