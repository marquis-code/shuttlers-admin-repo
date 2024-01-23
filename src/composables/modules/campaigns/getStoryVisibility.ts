import { campaigns_api, CustomAxiosResponse } from '@/api_factory/modules'
const story_visibility = ref()
export const useGetCampaignStoryVisibility = () => {
    const loading = ref(false)
    const { $_get_story_visibility } = campaigns_api

    const getStoryVisibility = async () => {
        loading.value = true

        const res = await $_get_story_visibility() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            story_visibility.value = res.data.enabled
        }
        loading.value = false
    }

    return { loading, getStoryVisibility, story_visibility }
}
