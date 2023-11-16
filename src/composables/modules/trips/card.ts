import { useGetActiveTripsList, useGetCompletedTripsList, useGetUpcomingTripsList } from './fetch'

export const useTripCardSearch = () => {
    const { activeTripsList, filterData: active_filterData, getActiveTrips, loadingActiveTrips } = useGetActiveTripsList()
    const { upcomingTripsList, filterData: upcoming_filterData, getUpcomingTrips, loadingUpcomingTrips } = useGetUpcomingTripsList()
    const { completedTripsList, filterData: completed_filterData, getCompletedTrips, loadingCompletedTrips } = useGetCompletedTripsList()

    const loading = computed(() => loadingActiveTrips.value || loadingUpcomingTrips.value || loadingCompletedTrips.value)

    const fetchedData = computed(() => {
        return {
            active: activeTripsList.value,
            upcoming: upcomingTripsList.value,
            completed: completedTripsList.value
        }
    })

    const fetchTrips = async ({ tripType }) => {
        switch (tripType) {
            case 'active':
                await getActiveTrips()
                break
            case 'upcoming':
                await getUpcomingTrips()
                break
            case 'completed':
                await getCompletedTrips()
                break
        }
    }

    return {
        loading, fetchedData, fetchTrips
    }
 }
