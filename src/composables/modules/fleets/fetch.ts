import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
import { usePagination } from '@/composables/utils/table'

export const useGetFleets = () => {
    const loadingFleets = ref(false)
    const fleetsList = ref([] as any[])
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const filterData = {
        status: ref(''),
        search: ref(''),
        start_date_filter: ref(''),
        end_date_filter: ref(''),
        vehicle_id: ref(''),
        type: ref('')
    }

    const getFleetsList = async () => {
        loadingFleets.value = true

        const res = await fleets_api.$_get_fleets(metaObject, filterData) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            fleetsList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.brand} ${item.name}`, registration_number: item.registration_number, seats: item.seats, type: item.type, drivers: item.drivers, created_at: item.created_at }))
            // fleetsList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.brand} ${item.name}`, registration_number: item.registration_number, seats: item.seats, type: item.type, drivers: item.drivers, created_at: item.created_at, rating: 'N/A', amenities: 'N/A' }))
            metaObject.total.value = res.data.metadata.total_pages
        }
        loadingFleets.value = false
    }
    setFunction(getFleetsList)

    watch([filterData.status, filterData.search, filterData.type, filterData.end_date_filter, filterData.start_date_filter], (val) => {
        getFleetsList()
    })

    const onFilterUpdate = (data: any) => {
        switch (data.type) {
            case 'status':
                filterData.status.value = data.value === '0' ? 'inactive' : 'active'
                break
            case 'search':
                filterData.search.value = data.value
                break
            case 'dateRange':
                filterData.start_date_filter.value = data.value[0]
                filterData.end_date_filter.value = data.value[1]
                break
        }
    }

    return { getFleetsList, loadingFleets, fleetsList, filterData, onFilterUpdate, moveTo, ...metaObject, next, prev }
}

export const useGetFleetInspectionDays = () => {
    const { metaObject, moveTo, next, prev, setFunction } = usePagination()
    const loadingInspectionDays = ref(false)
    const fleetInspectionDaysList = ref([] as any)

    const { $_get_fleet_inspection_days } = fleets_api

    const getFleetsInspectionDaysList = async () => {
        loadingInspectionDays.value = true

        const res = await $_get_fleet_inspection_days(metaObject) as CustomAxiosResponse

        if (res.type !== 'ERROR') {
            fleetInspectionDaysList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.vehicle.brand}  ${item.vehicle.name}`, registrationNumber: item?.vehicle?.registration_number, seats: item?.vehicle?.seats, inspectionSite: item?.inspectionSite.name, partner: item.partner.company_name, inspectionDateAndTime: `${item.date} (${item.time})`, created_at: item?.created_at }))
            metaObject.total.value = res.data.metadata.total_pages
        }
        loadingInspectionDays.value = false
    }
    setFunction(getFleetsInspectionDaysList)

    return { getFleetsInspectionDaysList, loadingInspectionDays, fleetInspectionDaysList, moveTo, ...metaObject, next, prev }
}
