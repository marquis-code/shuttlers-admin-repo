import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const loading = ref(false)
const groups = ref([] as Record<string, any>[])
const filterData = {
    search: ref('')
}

export const useFetchGroup = () => {
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()
    const fetchGroup = async () => {
        const corporate_id = useRoute().params.id as string
        loading.value = true
        const res = await corporates_api.$_get_trips_groups(Number(corporate_id), metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            groups.value = res.data.data
            metaObject.total_pages.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }
    setFunction(fetchGroup)

    watch([filterData.search], (val) => {
        fetchGroup()
    })

    const onFilterUpdate = (data) => {
        if (data.type === 'search') {
            filterData.search.value = data.value
        }
    }

    return { loading, groups, fetchGroup, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}
