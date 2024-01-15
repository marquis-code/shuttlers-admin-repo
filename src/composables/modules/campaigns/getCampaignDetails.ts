import { campaigns_api, CustomAxiosResponse } from '@/api_factory/modules'
const campaignInfo = ref({}) as any
export const useGetCampaignDetails = () => {
    const loading = ref(false)
    const { $_get_campaign_details } = campaigns_api

    const getCampaignDetails = async (id: string) => {
        loading.value = true

        const res = await $_get_campaign_details(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            campaignInfo.value = res?.data[0] || {}
        }
        loading.value = false
    }

    return { loading, getCampaignDetails, campaignInfo }
}
