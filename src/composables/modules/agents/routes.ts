import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { usePagination } from '@/composables/utils/table'
import { isValidJsonString } from '@/composables/utils/formatter'

const agentsRoute = ref([] as any)
const agentDataRef = ref()
const total_commissions = ref(0)

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
		status: ref('active'),
		start_date: ref(''),
		end_date: ref(''),
		search: ref('')
	}

		const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'dateRange':
				filterData.start_date.value = data.value[0] ? data.value[0] : ''
				filterData.end_date.value = data.value[1] ? data.value[1] : ''
                break
			case 'search':
				filterData.search.value = data.value
				break
        }
    }
	const filterData_monitoring = {
		trip_type: ref('completed')
	}
	watch([filterData.approval_status, filterData_monitoring.trip_type, filterData.end_date, filterData.start_date, filterData.search], (val) => {
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
				metaObject.total.value = response.data.metadata.total
				metaObject.total_pages.value = response.data.metadata.total_pages
			}
        } else {
            filterData.to.value = new Date().toISOString().split('T')[0]

            const date = new Date()
            date.setDate(date.getDate() - 30)
            filterData.from.value = date.toISOString().split('T')[0]

			const response = (await agents_api.$_get_Agent_trip_monitoring(agentDataRef.value.sales_agent_account_id, filterData_monitoring)) as CustomAxiosResponse
			if (response.type !== 'ERROR') {
				agentsRoute.value = response.data.data
				if (response.data.total_commissions) {
					total_commissions.value = response.data.total_commissions
				}
				metaObject.total.value = response.data.metadata.total
				metaObject.total_pages.value = response.data.metadata.total_pages
			}
		}
		loading.value = false
	}
	setFunction(getAgentsRoute)

	return {
		getAgentsRoute, filterData_monitoring, onFilterUpdate,
		loading, total_commissions,
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
