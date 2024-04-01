import { useTripTracking } from '../index'
import { useGetActiveTripsList } from '@/composables/modules/trips/fetch/activeTrips'

export const useVehicleTracking = () => {
    const { activeTripsList, getActiveTrips, loadingActiveTrips, total, filterData } = useGetActiveTripsList()
    const { listenToSpecificTripLocationAndAddtoMap } = useTripTracking()
    const filterStatusRef = ref()

    const filterStatus = {
        city: ref([]),
        status: ref([])
    }

    watch([filterStatus.city, filterStatus.status], (val) => {
        if (val[0]) {
            filterData.city_ids.value = val[0].length === 0 ? '' : JSON.stringify(val[0].map((item: any) => item.value))
        }
        if (val[1]) {
            if (val[1].length === 0 || val[1].length >= 2) {
                filterStatusRef.value = ''
            } else {
                filterStatusRef.value = val[1].map((item: any) => item.value).join('').toLowerCase().includes('online')
            }
        }
    })

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
        const res = activeTripsList.value.sort((a, b) => {
            if (a.vehicle_status === b.vehicle_status) return 0
            if (a.vehicle_status) return -1
            return 1
        })

        if (filterStatusRef.value) {
            return res.filter((trip) => trip.vehicle_status)
        } else {
            return res.filter((trip) => !trip.vehicle_status)
        }
    })

    return { getActiveTrips, filteredActiveTripsList, loadingActiveTrips, initializeTracking, total, filterStatus, filterData }
}
