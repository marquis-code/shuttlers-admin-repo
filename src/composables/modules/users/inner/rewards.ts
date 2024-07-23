import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'
import { usePagination } from '@/composables/utils/table'
import { useAlert } from '@/composables/core/notification'

export const useGetUserRewardsHistories = () => {
    const { prev, metaObject, next, moveTo, setFunction } = usePagination()
    const loadingUserRewardHistories = ref(false)
    const rewardHistories = ref([])
    const userType = ref('user')

    const getUserRewardsHistories = async (userId:string) => {
        loadingUserRewardHistories.value = true
        const res = await campaigns_api.$_get_reward_histories(metaObject, userType.value, userId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            rewardHistories.value = res.data.data
            metaObject.total.value = res?.data?.metadata?.total_pages
        }
        loadingUserRewardHistories.value = false
    }

    setFunction(getUserRewardsHistories)

    return { getUserRewardsHistories, loadingUserRewardHistories, rewardHistories, prev, ...metaObject, next, moveTo }
}
