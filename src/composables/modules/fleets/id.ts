import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

const selectedVehicle = ref({} as Record<string, any>)
const selectedVehicleId = ref('') as any | number

export const useVehicleIdDetails = () => {
    const loading = ref(false)

    const getVehicleById = async (id: number) => {
        selectedVehicleId.value = id
        loading.value = true
        const res = await fleets_api.$_get_fleets_by_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            selectedVehicle.value = res.data
        }
        loading.value = false
        return res.data
    }
    return { selectedVehicle, loading, getVehicleById }
}

export const useGetFleetTripHistory = () => {
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const loadingTripHistory = ref(false)
    const fleeTripHistory = ref([] as any)
    const filterData = {
        start_date_filter: ref(''),
        end_date_filter: ref('')
    }

    const { $_get_fleet_history_by_id } = fleets_api

    const getFleetsTripHistory = async (id?:string) => {
        loadingTripHistory.value = true

        if (!selectedVehicleId.value && id) selectedVehicleId.value = id

        const res = await $_get_fleet_history_by_id(selectedVehicleId.value, metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            fleeTripHistory.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.vehicle?.brand || 'N/A'}  ${item.vehicle?.name || ''}`, registrationNumber: item?.vehicle?.registration_number, seats: item?.vehicle?.seats, partner: item?.partner?.company_name || 'N/A', created_at: item?.created_at }))
            metaObject.total.value = res.data.metadata.total_pages
        }
        loadingTripHistory.value = false
    }
    setFunction(getFleetsTripHistory)

    watch([filterData.start_date_filter, filterData.end_date_filter], (val) => {
        getFleetsTripHistory()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
                filterData.start_date_filter.value = data.value[0]
                filterData.end_date_filter.value = data.value[1]
                break
        }
    }

    return { getFleetsTripHistory, loadingTripHistory, fleeTripHistory, moveTo, ...metaObject, next, prev, onFilterUpdate }
}

export const useGetFleetDocuments = () => {
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const loading = ref(false)
    const partnerId = ref('')
    const fleetDocuments = ref([] as any)
    const { $_get_fleet_documents_by_id } = fleets_api

    const getFleetsDocuments = async () => {
        loading.value = true

        const res = await $_get_fleet_documents_by_id(selectedVehicleId.value, selectedVehicle?.value?.partner?.id) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            fleetDocuments.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }

    return { getFleetsDocuments, loading, fleetDocuments, moveTo, ...metaObject, next, prev }
}

export const useGetFleetRating = () => {
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const loading = ref(false)
    const fleetRatings = ref([] as any)
    const filterData = {
        start_date_filter: ref(''),
        end_date_filter: ref('')
    }

    const { $_get_fleets_rating_by_id } = fleets_api

    const getFleetRatings = async () => {
        loading.value = true

        const res = await $_get_fleets_rating_by_id(selectedVehicleId.value, metaObject, filterData) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            fleetRatings.value = res.data.data
            metaObject.total.value = res.data.metadata.total_pages
        }
        loading.value = false
    }
    setFunction(getFleetRatings)

    watch([filterData.start_date_filter, filterData.end_date_filter], (val) => {
        getFleetRatings()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'dateRange':
                filterData.start_date_filter.value = data.value[0]
                filterData.end_date_filter.value = data.value[1]
                break
        }
    }

    return { getFleetRatings, loading, fleetRatings, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetVehicleEarnings = () => {
    const loadingEarnings = ref(false)
    const fleetEarnings = ref([] as any)
    const { $_get_fleet_revenue_by_id } = fleets_api

    const getVehicleEarnings = async () => {
        loadingEarnings.value = true

        const res = await $_get_fleet_revenue_by_id(selectedVehicleId.value) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            fleetEarnings.value = res.data.result
        }
        loadingEarnings.value = false
    }

    return { getVehicleEarnings, loadingEarnings, fleetEarnings }
}
