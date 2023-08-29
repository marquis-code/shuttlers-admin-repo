import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRecentSignupsList = () => {
    const loadingSignups = ref(false)
    const signupList = ref([] as any)

    const { $_recent_signups } = users_api

    const getSignupList = async () => {
        loadingSignups.value = true

        const res = await $_recent_signups() as CustomAxiosResponse

        if (res.type !== 'Error') {
            signupList.value = res.data
        }
        loadingSignups.value = false
    }

    return { getSignupList, loadingSignups, signupList }
}

export const useGetUsersList = () => {
    const loading = ref(false)
    const usersList = ref([] as any)

    const { $_get_users } = users_api

    const getUsersList = async () => {
        loading.value = true

        const res = await $_get_users() as CustomAxiosResponse

        if (res.type !== 'Error') {
            usersList.value = res.data.data
        }
        loading.value = false
    }

    return { getUsersList, loading, usersList }
}

export const useGetBatchBookingList = () => {
    const loading = ref(false)
    const batchBookingList = ref([] as any)

    const { $_get_batch_booking } = users_api

    const getBatchBookingList = async () => {
        loading.value = true

        const res = await $_get_batch_booking() as CustomAxiosResponse

        if (res.type !== 'Error') {
            batchBookingList.value = res.data.data
        }
        loading.value = false
    }

    return { getBatchBookingList, loading, batchBookingList }
}
