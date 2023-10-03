import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject } from '@/composables/utils/table'

export const campaigns_api = {
    // Pilot Endpoints
    $_pilot_points_list: (meta:TMetaObject, userType:string) => {
        const url = `/compliance-events?userType=${userType}&limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_configure_pilot_points: (payload: any) => {
        const url = '/reward-point-rate'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.post(url, payload)
    },
	$_get_pilot_leaderboard_points: (userType:string) => {
		const url = `/compliance-accumulated-points/range?userType=${userType}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
    $_get_leaderboard_points_list: (meta:TMetaObject, userType:string) => {
        const url = `/compliance-accumulated-points?userType=${userType}&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_get_pilot_reward_list: (meta:TMetaObject, userType:string) => {
        const url = `/compliance-rewards?userType=${userType}&limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_create_and_update_pilot_reward: (payload: any) => {
       const url = '/compliance-rewards'
       return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_delete_pilot_reward: (payload: {name: string, min_point: any, status: string}) => {
        const url = '/compliance-rewards'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
     },
    $_get_reward_histories_by_driver_id: (meta:TMetaObject, userType:string, userId:number) => {
        const url = `/compliance-reward-histories/${userType}/${userId}?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
    },
    $_edit_pilot_points: (id:number, payload: {points: number, event_name: string}) => {
        const url = `/compliance-events/${id}`
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    },
    $_update_pilot_reward_status: (id:number, payload: {status: string, name: string}) => {
        const url = '/compliance-rewards'
        return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.patch(url, payload)
    }
}
