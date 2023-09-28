import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'

export const campaigns_api = {
    $_pilot_points_list: () => {
        const url = '/v1/compliance-events'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_configure_pilot_points: (payload: any) => {
        const url = 'v1/reward-point-rate'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
    },
	$_get_pilot_leaderboard_points: () => {
		const url = '/v1/compliance-accumulated-points/range'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
    $_get_leaderboard_points_list: () => {
        const url = '/v1/compliance-accumulated-points'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_get_pilot_reward_list: () => {
        const url = '/v1/compliance-rewards'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },

    $_create_and_update_pilot_reward: (payload: any) => {
       const url = '/v1/compliance-rewards'
       return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_delete_pilot_reward: (payload: {name: string, min_point: any, status: string}) => {
        const url = '/v1/compliance-rewards'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
     },
    $_get_reward_histories_by_driver_id: (userType:string, userId:string) => {
        const url = `/v1/compliance-reward-histories/${userType}/${userId}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_edit_pilot_points: (id:number, payload: {points: number, event_name: string}) => {
        const url = `/v1/compliance-events/${id}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_update_pilot_reward_status: (id:number, payload: {status: string, name: string}) => {
        const url = '/v1/compliance-rewards'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    }
}
