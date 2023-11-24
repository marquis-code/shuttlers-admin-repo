import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useVehiclesByItineraryId = () => {
    const loadingVehicles = ref(false)
    const itinerariesVehicles = ref([])
    const getVehiclesByItineraryId = async (id: string) => {
        loadingVehicles.value = true
        const res = await routes_api.$_get_routes_itineraries_vehicles_by_itinerary_id(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            itinerariesVehicles.value = res?.data?.data
        }
        loadingVehicles.value = false
    }
    return { getVehiclesByItineraryId, loadingVehicles, itinerariesVehicles }
}
