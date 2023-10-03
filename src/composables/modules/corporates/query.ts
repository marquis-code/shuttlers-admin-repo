import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useQueryCompany = () => {
    const loadingQueriedCompany = ref(false)
    const queriedCompany = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

        const filterData = {
        search: ref('')
    }
    const { $_get_list } = corporates_api

    const queryCompany = async (query: string) => {
        if (query.length < 1) return
        loadingQueriedCompany.value = true
        filterData.search.value = query
        const res = await $_get_list(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            queriedCompany.value = res.data.models
        }
        loadingQueriedCompany.value = false
    }

    return { queryCompany, loadingQueriedCompany, queriedCompany }
}
