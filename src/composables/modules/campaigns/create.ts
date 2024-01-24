import { useCampaignModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { campaigns_api } from '@/api_factory/modules/campaigns'

export const useCreateManualReward = () => {
    const loading = ref(false)
    const credientials = {
        event_name: ref(''),
        user: ref()
    }

    const create = async () => {
        loading.value = true

            const res = (await campaigns_api.$_manual_user_reward({
         event_name: credientials.event_name.value,
    user_id: credientials.user.value.id,
    user_type: 'user'
            })) as any

        loading.value = false
        if (res.type !== 'ERROR') {
            useCampaignModal().closeCreateManualReward()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Reward awarded successfully' })
        }
    }

    return { loading, credientials, create }
}
