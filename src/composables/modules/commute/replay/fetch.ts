import { useAlert } from '@/composables/core/notification'
import { telemetry_api, CustomAxiosResponse } from '@/api_factory/modules'
import { loadPolyline } from '@/composables/core/map'

export const useRouteReplay = () => {
    const loadingVehicle = ref(false)
    const loadingPosition = ref(false)
    const vehicleList = ref([] as Record<string, any>[])
    const positionList = ref([] as Record<string, any>[])
    const filterData = {

    }

    const getVehicle = async () => {
        loadingVehicle.value = true
        const res = await telemetry_api.$_get_vehicles() as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            vehicleList.value = res.data.filter((item) => item.name)
        }
        loadingVehicle.value = false
    }

    const getPosition = async (id: string) => {
        loadingPosition.value = true
        const res = await telemetry_api.$_get_vehicle_positions(id) as CustomAxiosResponse
        if (res.type !== 'ERROR') {
            if (res.data.data.length === 0) {
                useAlert().openAlert({ type: 'ERROR', msg: 'No Path found' })
            }

            positionList.value = res.data.data.map((obj: any) => ({
                lat: obj.position_latitude,
                lng: obj.position_longitude
            }))

            await loadPolyline(positionList.value as any)
        }
        loadingPosition.value = false
    }

    return { getVehicle, getPosition, loadingVehicle, loadingPosition, positionList, vehicleList }
}
