import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'
import { useGetUpcomingTripsList } from '@/composables/modules/trips/fetch/upcomingTrips'
import { useGetCompletedTripsList } from '@/composables/modules/trips/fetch/completedTrips'

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

    const applyFilter = async ({ tripType, filterData }: { tripType: string, filterData: { search: string, dateRange: any[] } }) => {
        switch (tripType) {
            case 'active':
                active_filterData.from.value = filterData.dateRange[0]
                active_filterData.to.value = filterData.dateRange[1]
                active_filterData.search.value = filterData.search
                break
            case 'upcoming':
                upcoming_filterData.from.value = filterData.dateRange[0]
                upcoming_filterData.to.value = filterData.dateRange[1]
                upcoming_filterData.search.value = filterData.search
                break
            case 'completed':
                completed_filterData.from.value = filterData.dateRange[0]
                completed_filterData.to.value = filterData.dateRange[1]
                completed_filterData.search.value = filterData.search
                break
        }
    }

    return {
        loading, fetchedData, fetchTrips, applyFilter
    }
 }
