import { useGetPromotionsList } from '../fetch'
import { rewards_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useAlert } from '@/composables/core/notification'
import { usePromotionModal } from '@/composables/core/modals'

const obj = {
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
    obj.emails.value = []
    obj.reward_type.value = 'percentage_discount_on_trips'
    obj.percent.value = 0
    obj.prefix.value = ''
    obj.reward_name.value = ''
    obj.description.value = ''
    obj.trips_count.value = 0
}

export const useCreateReward = () => {
    const createReward = async () => {
        loading.value = true
        const payload = {
            customers: obj.emails.value.map((el) => {
                return {
                    email: el,
                    count: obj.trips_count.value
                }
            }),
            reward_kind: obj.reward_type.value,
            reward_amount: obj.percent.value,
            promo_code_prifix: obj.prefix.value,
            name: obj.reward_name.value,
            description: obj.description.value
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

    return { ...obj, loading, createReward, clearObj }
}
