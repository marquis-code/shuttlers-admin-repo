import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config'
import { useUser } from '@/composables/auth/user'

const { user } = useUser()

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
	}
}
