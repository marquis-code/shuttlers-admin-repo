import { UserCoordinate, Coordinate } from './types'
import { busMarker } from './svg_icon'
import { loadPolyline, map, getPathFromPolyline, loadBusstops, mapService } from './index'
import { getRouteById, getRouteBusstopsById } from '@/composables/modules/routes/create'
import { getTripByDriverId } from '@/composables/modules/tracking/vehicle/fetch'

const markersArray: google.maps.Marker[] = []
const openInfoWindow: google.maps.InfoWindow | null = null // Keep track of the open InfoWindow
const bounds: google.maps.LatLngBounds | null = null
const activeVehicleDriver_id = ref<string | null>()

export const loadMarkeronMap = async (location: UserCoordinate, clickFunc: (location: UserCoordinate) => void, imgString = '/user.svg', direction = 0) => {
    mapService.loadMarkerOnMap(location, clickFunc, imgString, direction)
}

export const useLoadMarkerOnMap = () => {
    const fetchRouteLoading = ref(false)
    const zoomMapInOnCoordinate = async (location: Coordinate) => {
        mapService.zoomMapInOnCoordinate(location)
    }
    const VehicleMarkerExist = (id: string) => {
        return markersArray.find((marker: any) => Number(marker!.id) === Number(id))
    }

    const setActiveTrip = async (id: string) => {
        mapService.setActiveTrip(id)
    }

    return {
        zoomMapInOnCoordinate, VehicleMarkerExist, setActiveTrip, activeVehicleDriver_id, fetchRouteLoading
    }
}
