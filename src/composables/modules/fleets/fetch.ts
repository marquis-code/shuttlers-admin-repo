import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'

export const useGetFleets = () => {
    const loadingFleets = ref(false)
    const fleetsList = ref([] as any)

    const { $_get_fleets } = fleets_api

    const getFleetsList = async () => {
        loadingFleets.value = true

        const res = await $_get_fleets() as CustomAxiosResponse

        if (res.type !== 'Error') {
            fleetsList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.brand} ${item.name}`, registration_number: item.registration_number, seats: item.seats, type: item.type, drivers: item.drivers, created_at: item.created_at, rating: 'N/A', amenities: 'N/A' }))
        }
        loadingFleets.value = false
    }

    return { getFleetsList, loadingFleets, fleetsList }
}

export const useGetFleetInspectionDays = () => {
    const loadingInspectionDays = ref(false)
    const fleetInspectionDaysList = ref([] as any)

    const { $_get_fleet_inspection_days } = fleets_api

    const getFleetsInspectionDaysList = async () => {
        loadingInspectionDays.value = true

        const res = await $_get_fleet_inspection_days() as CustomAxiosResponse

        if (res.type !== 'Error') {
            fleetInspectionDaysList.value = res.data.data.map((item : Record<string, any>) => ({ ...item, vehicle: `${item.vehicle.brand}  ${item.vehicle.name}`, registrationNumber: item?.vehicle?.registration_number, seats: item?.vehicle?.seats, inspectionSite: item?.inspectionSite.name, partner: item.partner.company_name, inspectionDateAndTime: `${item.date} (${item.time})`, created_at: item?.created_at }))
        }
        loadingInspectionDays.value = false
    }

    return { getFleetsInspectionDaysList, loadingInspectionDays, fleetInspectionDaysList }
}
