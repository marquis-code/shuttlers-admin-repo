import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'
import { TMetaObject, useTableFilter } from '@/composables/utils/table'

export const campaigns_api = {
    // Pilot Endpoints
    $_manual_user_reward: (payload: any) => {
        const url = '/user-compliance-events'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_pilot_points_list: (meta:TMetaObject, user_type:string) => {
        const url = `/compliance-events?user_type=${user_type}&limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_configure_pilot_points: (payload: any) => {
        const url = '/reward-point-rate'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
	$_get_pilot_leaderboard_points: (user_type:string) => {
		const url = `/compliance-accumulated-points/range?user_type=${user_type}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_get_leaderboard_points_list: (meta:TMetaObject, user_type:string) => {
        const url = `/compliance-accumulated-points?user_type=${user_type}&limit=${meta.page_size.value}&page=${meta.page.value}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_pilot_reward_list: (meta:TMetaObject, user_type:string) => {
        const url = `/compliance-rewards?user_type=${user_type}&limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_create_and_update_pilot_reward: (payload: any) => {
       const url = '/compliance-rewards'
       return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
    $_delete_pilot_reward: (payload: {name: string, min_point: any, status: string}) => {
        const url = '/compliance-rewards'
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
     },
    $_get_reward_histories_by_driver_id: (meta:TMetaObject, user_type:string, userId:number) => {
        const url = `/compliance-reward-histories/${user_type}/${userId}?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },

    $_edit_pilot_points: (payload: {points: number, event_name: string}) => {
        const url = '/compliance-events'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_update_pilot_reward_status: (id:number, payload: {status: string, name: string}) => {
        const url = '/compliance-rewards'
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
     $_get_pilot_points: () => {
        const url = '/v1/reward-point-rate'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url)
    },
    $_get_point_rate: (user_type:string) => {
        const url = `/reward-point-rate?user_type=${user_type}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_baners: (meta:TMetaObject) => {
        const url = `/dynamic-dashboard/banners?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_carousels: (meta:TMetaObject) => {
        const url = `/dynamic-dashboard/carousels?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_campaigns: (meta:TMetaObject, filterData?: Record<string, Ref>) => {
        const queryParams = useTableFilter(filterData)
        const url = `/campaigns?${queryParams}limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_valentine_campaign_by_id: (id: string, meta:TMetaObject) => {
        const url = `/campaigns/${id}?limit=${meta.page_size.value}&page=${meta.page.value}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_valentine_campaign_winners: (id: string, meta:TMetaObject, filterData?: Record<string, Ref>) => {
        const queryParams = useTableFilter(filterData)
        const url = `/campaign/${id}/winners?${queryParams}limit=${meta.page_size.value}&page=${meta.page.value}&metadata=true`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_toggle_story_feature: (id, payload) => {
        const url = `campaigns/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
    $_get_story_visibility: () => {
        const url = '/stories/visibility'
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_update_story_visibility: (payload) => {
        const url = '/stories/visibility'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_get_campaign_details: (id: string) => {
        const url = `campaigns/${id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_create_banner: (payload:Record<string, any>) => {
        const url = '/dynamic-dashboard/banners'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_update_banner: (banner_id: number, payload:Record<string, any>) => {
        const url = `/dynamic-dashboard/banners/${banner_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
    $_get_banner_details: (banner_id: number) => {
        const url = `/dynamic-dashboard/banners/${banner_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_create_carousel: (payload:Record<string, any>) => {
        const url = '/dynamic-dashboard/carousels'
        return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
    $_update_carousel: (carousel_id: number, payload:Record<string, any>) => {
        const url = `/dynamic-dashboard/carousels/${carousel_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.patch(url, payload)
    },
    $_get_carousel_details: (carousel_id: number) => {
        const url = `/dynamic-dashboard/carousels/${carousel_id}`
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    },
    $_get_dynamic_urls: () => {
        const url = '/dynamic-dashboard/dynamic-urls'
        return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
    }
}
