import { users_api, CustomAxiosResponse } from '@/api_factory/modules'

const loading = ref(false)
const graph = ref([]) as Ref<any[]>

export const useUserRidesGraph = () => {
    const fetchUserRidesGraph = async () => {
        graph.value = []
        loading.value = true
        const userId = useRoute().params.id as string
        const res = await users_api.$_get_user_trip_graph(userId) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            graph.value = res.data?.length ? res.data : []
        }
        loading.value = false
    }

    return { loading, graph, fetchUserRidesGraph }
}
