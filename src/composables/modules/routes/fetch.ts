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
            metaObject.total.value = res.data.pagination?.pageCount
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
