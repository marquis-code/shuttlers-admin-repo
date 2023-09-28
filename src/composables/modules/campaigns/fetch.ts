import { campaigns_api } from '@/api_factory/modules/campaigns'
import { CustomAxiosResponse } from '@/api_factory/axios.config'

const payloads = {
    name: ref(''),
    min_point: ref(''),
    status: ref(''),
    value: ref(''),
    currency: ref('NGN')
}

export const use_create_reward = () => {
    const processing = ref(false)

    const createReward = async () => {
        processing.value = true
        const res = (await campaigns_api.$_create_and_update_pilot_reward({
            name: payloads.name.value,
            min_point: payloads.min_point.value,
            status: payloads.status.value
        })) as any
        processing.value = false
        if (res.type !== 'ERROR') {
            // location.assign('/campaigns/rewards/')
        }
    }

    return { payloads, createReward, processing }
}

// export const use_update_reward = () => {
//     const loading = ref(false)

//     const updateReward = async () => {
//         loading.value = true
//         const res = (await campaigns_api.$_create_and_update_pilot_reward({
//             name: payloads.name.value,
//             status: payloads.status.value
//         })) as any
//         loading.value = false
//         if (res.type !== 'ERROR') {
//             location.assign('/campaigns/rewards/')
//         }
//     }

//     return { payloads, updateReward, loading }
// }

export const use_delete_reward = () => {
    const processingDelete = ref(false)

    const deleteReward = async () => {
        processingDelete.value = true
        const res = (await campaigns_api.$_delete_pilot_reward({
            name: payloads.name.value,
            min_point: null,
            status: 'inactive'
        })) as any
        processingDelete.value = false
        if (res.type !== 'ERROR') {
            // location.assign(`/campaigns/rewards/${id}`)
        }
    }

    return { payloads, deleteReward, processingDelete }
}

const rewardsList = ref([])
export const use_get_pilot_reward_list = () => {
    const loadingPilotRewardList = ref(false)
    const getPilotRewards = async () => {
        loadingPilotRewardList.value = true
        const res = await campaigns_api.$_get_pilot_reward_list() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            rewardsList.value = res.data
        }
        loadingPilotRewardList.value = false
    }

    return { getPilotRewards, loadingPilotRewardList, rewardsList }
}

export const use_get_pilot_point_list = () => {
    const loadingPointsList = ref(false)
    const pointsList = ref([] as any)

    const { $_pilot_points_list } = campaigns_api

    const getPilotPoints = async () => {
        loadingPointsList.value = true
        const res = await $_pilot_points_list() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pointsList.value = res?.data
        }
        loadingPointsList.value = false
    }

    return { getPilotPoints, loadingPointsList, pointsList }
}

export const use_get_pilot_hightest_lowest_points = () => {
    const loading_pilot_rate_points = ref(false)
    const pointsObject = ref({})

    const getPointsRate = async () => {
        loading_pilot_rate_points.value = true
        const res = await campaigns_api.$_get_pilot_leaderboard_points() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            pointsObject.value = res.data
        }
        loading_pilot_rate_points.value = false
    }

    return { getPointsRate, loading_pilot_rate_points, pointsObject }
}

export const use_get_pilot_histories_by_id = () => {
    const loadingPilotRewardHistories = ref(false)
    const rewardHistories = ref([])

    const getPilotRewardsHistories = async (userType:string, userId:string) => {
        loadingPilotRewardHistories.value = true
        const res = await campaigns_api.$_get_reward_histories_by_driver_id(userType, userId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            rewardHistories.value = res.data.data
        }
        loadingPilotRewardHistories.value = false
    }

    return { getPilotRewardsHistories, loadingPilotRewardHistories, rewardHistories }
}

export const use_configure_point = () => {
    const loading = ref(false)

    const configurePoint = async () => {
        loading.value = true
        const res = (await campaigns_api.$_configure_pilot_points({
            point: Number(payloads.min_point.value),
            value: Number(payloads.value.value),
            currency: payloads.currency.value
        })) as any
        loading.value = false
        if (res.type !== 'ERROR') {
            // location.assign('/campaigns/rewards/')
        }
    }

    return { payloads, configurePoint, loading }
}

export const use_edit_point = () => {
    const loading = ref(false)

    const editPoint = async (id:number) => {
        loading.value = true
        const payload = {
            points: Number(payloads?.min_point?.value),
            event_name: payloads?.name?.value
        }
        const res = (await campaigns_api.$_edit_pilot_points(id, payload)) as any
        loading.value = false
        if (res.type !== 'ERROR') {
            // location.assign('/campaigns/rewards/')
        }
    }
    return { payloads, editPoint, loading }
}

export const use_get_leaderboard_point_list = () => {
    const loadingLeaderboardPointsList = ref(false)
    const leaderboardPointsList = ref([] as any)

    const { $_get_leaderboard_points_list } = campaigns_api

    const getLeaderboardPointsList = async () => {
        loadingLeaderboardPointsList.value = true
        const res = await $_get_leaderboard_points_list() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            leaderboardPointsList.value = res?.data?.data
        }
        loadingLeaderboardPointsList.value = false
    }

    return { getLeaderboardPointsList, loadingLeaderboardPointsList, leaderboardPointsList }
}

export const use_update_reward = () => {
    const loadingRewardUpdate = ref(false)

    const editReward = async (id:number) => {
        loadingRewardUpdate.value = true
        const payload = {
            status: payloads?.status?.value,
            name: payloads?.name?.value
        }
        const res = (await campaigns_api.$_update_pilot_reward_status(id, payload)) as any
        loadingRewardUpdate.value = false
        if (res.type !== 'ERROR') {
            // location.assign('/campaigns/rewards/')
        }
    }
    return { payloads, editReward, loadingRewardUpdate }
}
