import { GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH } from '@/api_factory/axios.config'

export const events_api = {
	$_get_events: (params) => {
		let url = '/event/admin/events?metadata=true&page=1&size=10&related=itineraries'
		if (params.status === 'accepted') {
          url = url + `&status=${params.status}`
		}
		return GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH.get(url)
	}
}
