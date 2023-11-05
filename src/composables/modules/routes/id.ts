import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedRoute = ref({} as Record<string, any>)
const selectedRouteId = ref('')
// const selectedPartnerAccountSid = ref('')
const routeId = ref<number>()

export const useRouteIdDetails = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteBusstops = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteItinerary = () => {
    const loading = ref(false)

    const getRouteById = async (id: string) => {
        selectedRouteId.value = id
        loading.value = true
        const res = await routes_api.$_get_route_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedRoute.value = res.data
        }
        loading.value = false
    }
    return { selectedRoute, loading, getRouteById }
}

export const useRouteTrips = () => {
    const loading = ref(false)
    const tripsList = ref([] as any)
    const { moveTo, metaObject, next, prev, setFunction } = usePagination()

    const filterData = {
        status: ref(''),
        '[route_type]': ref('')
    }

    watch([filterData.status, filterData['[route_type]']], (val) => {
        getRouteTrips()
    })

    const getRouteTrips = async () => {
        loading.value = true
        const res = await routes_api.$_get_route_by_id(selectedRouteId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            tripsList.value = res.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loading.value = false
    }

    setFunction(getRouteTrips)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
        }
    }

    return { selectedRoute, loading, getRouteTrips, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject }
}
