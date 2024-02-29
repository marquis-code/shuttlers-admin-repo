import { CustomAxiosResponse } from '@/api_factory/modules'
import { agents_api } from '@/api_factory/modules/agent'
import { usePagination } from '@/composables/utils/table'

const agentsPassenger = ref([] as any)

export const useGetAgentsPassengers = () => {
    const loading = ref(false)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const getAgentsPassenger = async (id:string) => {
        agentsPassenger.value = []
        loading.value = true

        const response = await agents_api.$_get_agent_passageners(id) as CustomAxiosResponse

        if (response.type !== 'ERROR') {
            agentsPassenger.value = response.data.data.map((item:any) => item.user)
            metaObject.total.value = response.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getAgentsPassenger)

    return { getAgentsPassenger, loading, agentsPassenger, moveTo, ...metaObject, next, prev }
}
