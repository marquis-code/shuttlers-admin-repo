import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetCorporateGraph = () => {
    const loading = ref(false)
    const corporatesGraphData = ref({} as any)

    const { $_get_graph } = corporates_api

    const getCorporatesGraph = async () => {
        loading.value = true
        const res = await $_get_graph() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesGraphData.value = res.data
        }
        loading.value = false
    }

    return { getCorporatesGraph, loading, corporatesGraphData }
}

export const useGetCorporateList = () => {
    const loading = ref(false)
    const corporatesList = ref([] as any)
    const corporateMetaData = ref({} as any)
    const { loadMore, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_list } = corporates_api

    const filterData = {
        search: ref(''),
        start_date_filter: ref(''),
        end_date_filter: ref(''),
        active: ref(1)
    }

    watch([filterData.search, filterData.start_date_filter, filterData.end_date_filter, filterData.active], (val) => {
        getCorporatesList()
    })

    const getCorporatesList = async () => {
        loading.value = true
        const res = await $_get_list(filterData, metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesList.value = res.data.models
            metaObject.total.value = res.data.pagination?.rowCount
        }
        loading.value = false
    }

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'search':
                filterData.search.value = data.value
                break
            case 'status':
                filterData.active.value = data.value
                break
        }
    }

    return { getCorporatesList, loading, corporatesList, filterData, onFilterUpdate }
}

export const useGetDemoRequest = () => {
    const loading = ref(false)
    const corporatesList = ref([] as any)
    const corporateMetaData = ref({} as any)

    const { $_get_demo_request } = corporates_api

    const getCorporatesDemoRequest = async () => {
        loading.value = true
        const res = await $_get_demo_request() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesList.value = res.data.data
            corporateMetaData.value = res.data.pagination?.rowCount
            console.log(corporatesList.value)
        }
        loading.value = false
    }

    return { getCorporatesDemoRequest, loading, corporatesList }
}
