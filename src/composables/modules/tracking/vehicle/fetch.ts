import { useTripTracking } from '../index'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'

export const useVehicleTracking = () => {
    const { activeTripsList, getActiveTrips, loadingActiveTrips, page_size } = useGetActiveTripsList()
    const { listenToSpecificTripLocationAndAddtoMap } = useTripTracking()
    const initializeTracking = async () => {
        await getActiveTrips()
        watch(activeTripsList, () => {
            if (activeTripsList.value.length > 0) {
                activeTripsList.value.forEach((trips) => {
                trips.vehicle_status = false
                listenToSpecificTripLocationAndAddtoMap(trips.id, () => {})
            })
            }
        }, { immediate: true })
    }

    const filteredActiveTripsList = computed(() => {
        return activeTripsList.value.sort((a, b) => {
            if (a.vehicle_status === b.vehicle_status) return 0
            if (a.vehicle_status) return -1
            return 1
        })
    })

    return { getActiveTrips, filteredActiveTripsList, loadingActiveTrips, initializeTracking, page_size }
}
