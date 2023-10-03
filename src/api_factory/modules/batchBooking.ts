import { GATEWAY_ENDPOINT_WITH_AUTH } from '@/api_factory/axios.config'

export const batch_booking_api = {
	$_get_batch_bookings: () => {
		const url = '/batch-bookings?limit=10&page=1&metadata=true'
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	},
    $_create_batch_booking: (payload: any) => {
        const url = '/batch-bookings?limit=10&page=1&metadata=true'
		return GATEWAY_ENDPOINT_WITH_AUTH.post(url, payload)
    },
	$_get_batch_booking_by_id: (id: string) => {
		const url = `/batch-bookings/${id}`
		return GATEWAY_ENDPOINT_WITH_AUTH.get(url)
	}
}
