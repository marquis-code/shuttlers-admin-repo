import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetRecentRoutesList = () => {
    const loadingRoutes = ref(false)
    const routesList = ref([] as any)

    const { $_recent_routes } = routes_api

    const getRoutesList = async () => {
        loadingRoutes.value = true

        const res = await $_recent_routes() as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            routesList.value = res.data
        }
        loadingRoutes.value = false
    }

    return { getRoutesList, loadingRoutes, routesList }
}

export const useGetMainRoutes = () => {
    const loadingMainRoutes = ref(false)
    const mainRoutesList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_main_routes } = routes_api

    const filterData = {
        status: ref(''),
        is_exclusive: ref(''),
        visibility: ref(''),
        city_id: ref('')
    }

    watch([filterData.status, filterData.is_exclusive, filterData.visibility, filterData.city_id], (val) => {
        getMainRoutesList()
    })

    const getMainRoutesList = async () => {
        loadingMainRoutes.value = true

        const res = await $_get_main_routes(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            mainRoutesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingMainRoutes.value = false
    }

    setFunction(getMainRoutesList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'is_exclusive':
                filterData.is_exclusive.value = data.value
                break
            case 'visibility':
                    filterData.visibility.value = data.value
                break
            case 'city_id':
                    filterData.city_id.value = data.value
                break
        }
    }

    return { getMainRoutesList, loadingMainRoutes, mainRoutesList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useGetSuspendedRoutes = () => {
    const loadingSuspendedRoutes = ref(false)
    const suspendedRoutesList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_suspended_routes } = routes_api

    const filterData = {
        status: ref(''),
        '[route_type]': ref('')
    }

    watch([filterData.status, filterData['[route_type]']], (val) => {
        getSuspendedRoutesList()
    })

    const getSuspendedRoutesList = async () => {
        loadingSuspendedRoutes.value = true

        const res = await $_get_suspended_routes(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            suspendedRoutesList.value = res.data.data
            metaObject.total.value = res.data.pagination?.pageCount
        }
        loadingSuspendedRoutes.value = false
    }

    setFunction(getSuspendedRoutesList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case '[route_type]':
                filterData['[route_type]'].value = data.value
                break
        }
    }

    return { getSuspendedRoutesList, loadingSuspendedRoutes, suspendedRoutesList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}

export const useGetTripTime = () => {
    const loadingTripTime = ref(false)
    const tripTimeList = ref([] as any)

    const getTripTime = async () => {
        loadingTripTime.value = true
        const res = await routes_api.$_get_trip_time() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripTimeList.value = res.data
        }
        loadingTripTime.value = false
    }

    return { getTripTime, loadingTripTime, tripTimeList }
}

export const useGetSuggestedRoutes = () => {
    const loadingSuggestedRoutes = ref(false)
    const suggestedRoutesList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const { $_get_suggested_routes } = routes_api

    const filterData = {
        search: ref(''),
        start_date: ref(''),
        end_date: ref('')
    }

    watch([filterData.search, filterData.start_date, filterData.end_date], (val) => {
        getSuggestedRoutesList()
    })

    const getSuggestedRoutesList = async () => {
        loadingSuggestedRoutes.value = true

        const res = await $_get_suggested_routes(metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            suggestedRoutesList.value = res?.data
            metaObject.total.value = res.data?.length
        }
        loadingSuggestedRoutes.value = false
    }

    setFunction(getSuggestedRoutesList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date.value = data.value
                filterData.end_date.value = data.value
                break
        }
    }

    return { getSuggestedRoutesList, loadingSuggestedRoutes, suggestedRoutesList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}
