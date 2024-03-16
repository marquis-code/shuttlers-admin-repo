import { useTripTracking } from '../index'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'

export const useVehicleTracking = () => {
    const { activeTripsList, getActiveTrips, loadingActiveTrips } = useGetActiveTripsList()
    const { listenToSpecificTripLocationAndAddtoMap } = useTripTracking()
    const initializeTracking = async () => {
        await getActiveTrips()
        watch(activeTripsList, () => {
            if (activeTripsList.value.length > 0) {
                activeTripsList.value.forEach((trips) => {
                trips.status = false
                listenToSpecificTripLocationAndAddtoMap(trips.id, () => {})
            })
            }
        }, { immediate: true })
    }

    return { getActiveTrips, activeTripsList, loadingActiveTrips, initializeTracking }
}
