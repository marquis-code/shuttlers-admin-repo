import { useLoadMarkerOnMap, loadMarkeronMap } from '@/composables/core/map'

export const useActiveTripTrackingCardClick = () => {
    const { zoomMapInOnCoordinate } = useLoadMarkerOnMap()
    const onCardClick = (data) => {
        zoomMapInOnCoordinate({ lat: data.lat, lng: data.lng })
    }

    return { onCardClick }
}
