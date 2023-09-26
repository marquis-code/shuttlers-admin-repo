import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'

export const campaigns_api = {
    $_pilot_points_list: () => {
        const url = '/v1/compliance-events'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_edit_pilot_points: (id:string, payload: any) => {
        const url = `/v1/compliance-events/${id}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_configure_pilot_points: (payload: any) => {
        const url = 'v1/reward-point-rate'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
    },
    // Take out add events button and delete button
    // Pilot rewards tab end points
	$_get_pilot_leaderboard_points: () => {
		const url = '/v1/compliance-accumulated-points/range' // Get highest and lowest pilot leaderboard points
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
    $_get_leaderboard_points_list: () => {
        const url = '/v1/compliance-accumulated-points' // Get pilot leaderboard points list
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_get_pilot_reward_list: () => {
        const url = '/v1/compliance-rewards' // Get pilot rewards list
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },

    $_update_pilot_reward_status: () => {
        const url = '/v1/compliance-rewards' // check the patch endpoint pass in status of active to activeate and inactive to inactivate
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url)
    },
    $_create_and_update_pilot_reward: (payload: any) => {
       const url = '/v1/compliance-rewards'
       return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_delete_pilot_reward: (payload: any) => {
        const url = '/v1/compliance-rewards' // to delete pilot reward set the min_point to null in the api call also pass in name
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
     },
    $_get_reward_histories_by_driver_id: (userType:string, userId:string) => {
        const url = `/v1/compliance-reward-histories/${userType}/${userId}` // load reward histories
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    }
}
