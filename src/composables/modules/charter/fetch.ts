import { charter_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetRecentCharterList = () => {
    const loadingCharter = ref(false)
    const charterList = ref([] as any)

    const { $_recent_charter_requests } = charter_api

    const getCorporatesList = async () => {
        loadingCharter.value = true

        const res = await $_recent_charter_requests() as CustomAxiosResponse

        if (res.type !== 'Error') {
            charterList.value = res.data.data
        }
        loadingCharter.value = false
    }

    return { getCorporatesList, loadingCharter, charterList }
}
