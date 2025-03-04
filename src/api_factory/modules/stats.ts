import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'

export const stats_api = {
	$_rides_count: () => {
		const url = '/stats/rides-count'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_users_count: () => {
		const url = '/stats/users-count'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_drivers_count: () => {
		const url = '/stats/drivers-count'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_transactions_count: () => {
		const url = '/stats/transactions-count'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_get_trip_rating_service_id: () => {
		const url = '/rating/settings/service-id/trip_rating_service'
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_trip_rating_info: (serviceId:string) => {
		const url = `/rating/reports/all-time/${serviceId}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_trip_rating_info_by_date: (payload:{from : string, to: string}) => {
		const url = `/v1/stats/rating-stat?from=${payload.from}&to=${payload.to}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	},
	$_Sales_agent_stats: () => {
		const url = '/sales-agent-users/stats'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
	$_trip_passenger_rating: (payload:{startDate : string, endDate: string}) => {
		const url = `/v1/routes/passengers/stats?startDate=${payload.startDate}&endDate=${payload.endDate}`
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
