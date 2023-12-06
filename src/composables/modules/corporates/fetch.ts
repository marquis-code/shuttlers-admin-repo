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

    const corporatesList = ref([] as any)
export const useGetCorporateList = () => {
    const loading = ref(false)

    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

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

        const res = await $_get_list(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    setFunction(getCorporatesList)

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

    return { getCorporatesList, loading, corporatesList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useGetDemoRequest = () => {
    const loading = ref(false)
    const corporatesList = ref([] as any)

        const { metaObject, moveTo, next, prev, setFunction } = usePagination()

    const { $_get_demo_request } = corporates_api

    const getCorporatesDemoRequest = async () => {
        loading.value = true
        const res = await $_get_demo_request(metaObject) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            corporatesList.value = res.data.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loading.value = false
    }
    setFunction(getCorporatesDemoRequest)

    return { getCorporatesDemoRequest, loading, corporatesList, ...metaObject, next, prev, moveTo }
}

export const useGetShuttleRequests = () => {
    const loading = ref(false)
    const shuttleRequestsList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        created_at: ref('')
    }

    const { $_get_shuttle_request } = corporates_api

    watch([filterData.created_at], (val) => {
        loadShuttleRequest()
    })

    const loadShuttleRequest = async () => {
      loading.value = true
      const res = await $_get_shuttle_request(metaObject, filterData) as CustomAxiosResponse
      if (res.type !== 'ERROR') {
        shuttleRequestsList.value = res.data.data
        metaObject.total.value = res.data.pagination?.pageCount
    }
    loading.value = false
    }

    setFunction(loadShuttleRequest)

    const onFilterUpdate = (data) => {
        if (data.type === 'dateRange') {
            filterData.created_at.value = data.value
        }
    }

    return { loadShuttleRequest, loading, shuttleRequestsList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}
