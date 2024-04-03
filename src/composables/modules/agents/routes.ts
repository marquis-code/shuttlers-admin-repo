import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { usePagination } from '@/composables/utils/table'
import { isValidJsonString } from '@/composables/utils/formatter'

const agentsRoute = ref([] as any)
const agentDataRef = ref()

export const useGetAgentsRoutes = () => {
	const filterOptions = [
		{ name: 'Pending review', value: 'pending_review' },
		{ name: 'Trip monitoring', value: 'monitoring' },
		{ name: 'Approved routes', value: 'approved' },
		{ name: 'Declined routes', value: 'declined' }
	]
	const filterData = {
		approval_status: ref('pending_review'),
		from: ref(''),
        to: ref(''),
        status: ref('active')
	}
	watch([filterData.approval_status], (val) => {
		getAgentsRoute()
	})

	const loading = ref(false)
	const { moveTo, metaObject, next, prev, setFunction } = usePagination()

	const getAgentsRoute = async () => {
		agentsRoute.value = []
		loading.value = true

		if (filterData.approval_status.value !== 'monitoring') {
			const response = (await agents_api.$_get_agent_suggested_routes(
				agentDataRef.value.sales_agent_account_id,
				filterData
			)) as CustomAxiosResponse
			if (response.type !== 'ERROR') {
				agentsRoute.value = response.data.data.map((data) => {
					if (!isValidJsonString(data.route_available_days)) {
						data.route_available_days = '[]'
					}

					const pasrsed = JSON.parse(data.route_available_days)

					return {
						...data,
						route_available_days: pasrsed.join(', ')
					}
				})
				metaObject.total.value = response.data.metadata.total_pages
			}
        } else {
            filterData.to.value = new Date().toISOString().split('T')[0]

            const date = new Date()
            date.setDate(date.getDate() - 30)
            filterData.from.value = date.toISOString().split('T')[0]

			const response = (await agents_api.$_get_Agent_trip_monitoring(agentDataRef.value.id, filterData, metaObject)) as CustomAxiosResponse
			if (response.type !== 'ERROR') {
				agentsRoute.value = response.data.data
				metaObject.total.value = response.data.metadata.total_pages
			}
		}
		loading.value = false
	}
	setFunction(getAgentsRoute)

	return {
		getAgentsRoute,
		loading,
		agentsRoute,
		moveTo,
		...metaObject,
		next,
		prev,
		filterOptions,
		filterData,
		agentDataRef
	}
}
