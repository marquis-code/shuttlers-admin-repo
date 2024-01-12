import { campaigns_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
const selectedCampaignId = ref('')
const storyStatus = ref()
export const useToggleCampaignStory = () => {
    const loading = ref(false)
    const payload = {
        is_active: storyStatus.value
    }

    const { $_toggle_story_feature } = campaigns_api

    const toggleCampaignStory = async () => {
        loading.value = true

        const res = await $_toggle_story_feature(selectedCampaignId.value, convertObjWithRefToObj(payload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: `Story was successfully turned ${storyStatus ? 'ON' : 'OFF'}` })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }

    return { loading, toggleCampaignStory, storyStatus }
}
