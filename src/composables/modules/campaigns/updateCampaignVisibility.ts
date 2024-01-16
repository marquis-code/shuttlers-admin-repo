import { campaigns_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
export const useToggleCampaignStory = () => {
    const loading = ref(false)
    const payload = {
        enabled: ref()
    }

    const { $_toggle_story_feature } = campaigns_api

    const toggleCampaignStory = async (id: string) => {
        loading.value = true

        const res = await $_toggle_story_feature(id, convertObjWithRefToObj(payload)) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            useAlert().openAlert({ type: 'SUCCESS', msg: `Story was successfully turned ${payload.is_active.value ? 'ON' : 'OFF'}` })
            useConfirmationModal().closeAlert()
        }
        loading.value = false
    }
    const setStoryStatus = (data) => {
       payload.enabled = data.enabled
    }

    return { loading, toggleCampaignStory, setStoryStatus }
}
