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
