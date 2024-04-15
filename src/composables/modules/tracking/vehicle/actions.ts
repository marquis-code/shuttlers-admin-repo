import { useLoadMarkerOnMap } from '@/composables/core/map/tracking'
import { useAlert } from '@/composables/core/notification'

export const useActiveTripTrackingCardClick = () => {
    const { zoomMapInOnCoordinate, VehicleMarkerExist } = useLoadMarkerOnMap()
    const onCardClick = (data) => {
        if (data.vehicle_status) {
            if (VehicleMarkerExist(data.driver_id)) {
                zoomMapInOnCoordinate({ lat: data.lat, lng: data.lng })
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: 'Unknown error' })
            }
        } else {
            useAlert().openAlert({ type: 'ERROR', msg: 'This Vehicle is Offline' })
        }
    }

    return { onCardClick }
}
