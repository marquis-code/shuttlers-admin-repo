import moment from 'moment'
import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'
import { exportAsCsv, useDownloadReport } from '@/composables/utils/csv'

const { loading: downloading } = useDownloadReport()
const corporateId = ref('') as any
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
    const type = ref([]) as Ref<Record<string, any>[]>
    const visibility = ref([]) as Ref<Record<string, any>[]>
    const city = ref('')

    const computedType = computed(() => {
        if (type.value.length === 1) return type.value[0].value
        return ''
    })

    const computedVisibility = computed(() => {
        if (visibility.value.length === 1) return visibility.value[0].value
        return ''
    })
    const filterData = {
        search: ref(''),
        status: ref(1),
        is_exclusive: computedType,
        visibility: computedVisibility,
        city_id: computed(() => city.value)
    }

    watch([filterData.status, type, visibility, city, filterData.search], (val) => {
        getMainRoutesList()
    })

    const getMainRoutesList = async () => {
        loadingMainRoutes.value = true
        const res = await $_get_main_routes(metaObject, filterData, corporateId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            mainRoutesList.value = res.data.data
            metaObject.total.value = res.data.metadata?.total_pages
        }
        loadingMainRoutes.value = false
    }
    const setCorporateId = (id) => {
      corporateId.value = id
    }

    onMounted(() => {
        setCorporateId(corporateId.value)
    })

    setFunction(getMainRoutesList)

    const onFilterUpdate = (data) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value
                break
            case 'search':
                filterData.search.value = data.value
                break
        }
    }

    const downloadMainRoutes = async () => {
		downloading.value = true
		const name = ref(`all-${computedVisibility.value}-main-routes`)
		const res = await routes_api.$_download_main_routes(filterData) as CustomAxiosResponse
        if (res && res?.type !== 'ERROR') {
			const data = res.data.data
            const newArr = data.map((el) => {
                return {
                    Pickup: el?.pickup || 'N/A',
                    Dropoff: el?.destination || 'N/A',
                    Route_code: el?.route_code || 'N/A',
					Type: `${el?.is_exclusive ? 'Exclusive' : 'Shared'}`,
					Visibility: el?.visibility || 'N/A',
					Status: `${el?.status ? 'Active' : 'Inactive'}`
                }
            })
			exportAsCsv(newArr, name.value)
        }
		downloading.value = false
	}

    return { getMainRoutesList, loadingMainRoutes, mainRoutesList, filterData, onFilterUpdate, next, prev, moveTo, ...metaObject, corporateId, setCorporateId, type, visibility, city, downloadMainRoutes }
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
            metaObject.total.value = res.data.metadata.total_pages
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

export const useRoutePaymentOptions = () => {
    const loadingPaymentOptions = ref(false)
    const paymentOptionsList = ref([] as any)

    const { $_get_payment_options } = routes_api

    const getPaymentOptions = async () => {
        loadingPaymentOptions.value = true

        const res = await $_get_payment_options() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            paymentOptionsList.value = res.data.data
        }
        loadingPaymentOptions.value = false
    }

    return { getPaymentOptions, loadingPaymentOptions, paymentOptionsList }
}
