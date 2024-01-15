import { campaigns_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedCampaign = ref({} as Record<string, any>)
const selectedCampaignId = ref('')

export const useCampaignWinners = () => {
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const loading = ref(false)
    const campaignWinners = ref([] as any)
    const filterData = {
        search: ref(''),
        start_date: ref(''),
        end_date: ref('')
    }

    const { $_get_valentine_campaign_winners } = campaigns_api

    const getCampaignWinners = async () => {
        loading.value = true

        const res = await $_get_valentine_campaign_winners(selectedCampaignId.value, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            campaignWinners.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getCampaignWinners)

    watch([filterData.start_date, filterData.end_date, filterData.search], (val) => {
        getCampaignWinners()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
                case 'dateRange':
                    filterData.start_date.value = data.value[0] || ''
                    filterData.end_date.value = data.value[1] || ''
                break
        }
    }

    return { getCampaignWinners, loading, campaignWinners, selectedCampaign, onFilterUpdate, moveTo, ...metaObject, next, prev, selectedCampaignId }
}
