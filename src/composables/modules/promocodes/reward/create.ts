import { useGetPromotionsList } from '../fetch'
import { rewards_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePromotionModal } from '@/composables/core/modals'

const rewardsFormObj = {
    emails: ref([]) as Ref<string[]>,
    reward_type: ref('percentage_discount_on_trips'),
    percent: ref(0),
    prefix: ref(''),
    reward_name: ref(''),
    description: ref(''),
    trips_count: ref(0)
}
const loading = ref(false)

const clearObj = () => {
    rewardsFormObj.emails.value = []
    rewardsFormObj.reward_type.value = 'percentage_discount_on_trips'
    rewardsFormObj.percent.value = 0
    rewardsFormObj.prefix.value = ''
    rewardsFormObj.reward_name.value = ''
    rewardsFormObj.description.value = ''
    rewardsFormObj.trips_count.value = 0
}

export const useCreateReward = () => {
    const createReward = async () => {
        loading.value = true
        const payload = {
            customers: rewardsFormObj.emails.value.map((el) => {
                return {
                    email: el,
                    count: rewardsFormObj.trips_count.value
                }
            }),
            reward_kind: rewardsFormObj.reward_type.value,
            reward_amount: rewardsFormObj.percent.value,
            promo_code_prifix: rewardsFormObj.prefix.value,
            name: rewardsFormObj.reward_name.value,
            description: rewardsFormObj.description.value
        }
        const res = await rewards_api.$_create_rewards(payload) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data?.failed?.length) {
                useAlert().openAlert({
                    type: 'ERROR',
                    msg: `The following emails ${res.data?.failed.map((el) => ` ${el.email}`)} does not exist`
                })
            } else {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Promo code was created successfully.' })
                usePromotionModal().closeNewReward()
                useGetPromotionsList().getPromotionsList()
            }
        }
        loading.value = false
    }

    return { ...rewardsFormObj, loading, createReward, clearObj }
}
