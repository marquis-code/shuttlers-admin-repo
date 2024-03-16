import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { usePagination } from '@/composables/utils/table'
import { isValidJsonString } from '@/composables/utils/formatter'

const agentsRoute = ref([] as any)
const selectedAgentId = ref('')

export const useGetAgentsRoutes = () => {
    const filterOptions = [{ name: 'Pending review', value: 'pending_review' }, { name: 'Not Submitted', value: 'not_submitted' }, { name: 'Approved routes', value: 'approved' }, { name: 'Declined routes', value: 'declined' }]
    const filterData = {
        approval_status: ref('pending_review')
    }
        watch([filterData.approval_status], (val) => {
        getAgentsRoute()
    })

    const loading = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getAgentsRoute = async () => {
        agentsRoute.value = []
        loading.value = true

        const response = await agents_api.$_get_agent_suggested_routes(selectedAgentId.value, filterData) as CustomAxiosResponse

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
        loading.value = false
    }
    setFunction(getAgentsRoute)

    return { getAgentsRoute, loading, agentsRoute, moveTo, ...metaObject, next, prev, filterOptions, filterData, selectedAgentId }
}
