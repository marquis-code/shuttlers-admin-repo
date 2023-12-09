import { fleets_api, CustomAxiosResponse } from '@/api_factory/modules'
export const useGetVehicleTypes = () => {
    const loading = ref(false)
    const vehicleTypeslist = ref([] as any)

    const { $_get_vehicle_types } = fleets_api

    const getFleetTypes = async () => {
        loading.value = true

        const res = await $_get_vehicle_types() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            vehicleTypeslist.value = res.data.data
        }
        loading.value = false
    }

    return { getFleetTypes, loading, vehicleTypeslist }
}
