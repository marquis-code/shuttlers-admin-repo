import { ref, Ref } from 'vue'
import { LatLng, MapService } from './interface/index'
import { Coordinate, UserCoordinate } from './types'
import { ShouldUseGoogleMaps } from '@/composables/flagging/flags'

export let map
const defaultMapType = ShouldUseGoogleMaps() ? 'google' : 'osm'
export const mapService = new MapService(defaultMapType)

export const loading = ref(false)

export const calculateCenterAndZoom = async (coord1: Coordinate, coord2: Coordinate) => {
    await mapService.calculateCenterAndZoom(coord1, coord2)
}

export const initMap = async (mapDiv: Ref, mapId: string | null = null, mapType?: 'google' | 'osm') => {
    await mapService.initMap(mapDiv, mapId, mapType)
}

export const getPathFromPolyline = async (overviewPolyline) => {
    if (typeof overviewPolyline !== 'string') return
    const encodedPolyline = JSON.parse(overviewPolyline)

    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
    return encoding.decodePath(encodedPolyline.points)
}

export const loadPolyline = async (pathLine: LatLng[]): Promise<void> => {
    await mapService.loadPolyline(pathLine)
}

export const loadBusstops = async (stops: Record<string, any>[]): Promise<void> => {
    await mapService.loadBusstops(stops)
}

export const addPointOnMap = async (location: Coordinate) => {
    await mapService.addPointOnMap(location)
}

export const loadMarkerOnMap = async (location: UserCoordinate, clickFunc: (location: Coordinate) => void, imgString?: string, direction?: number): Promise<void> => {
    await mapService.loadMarkerOnMap(location, clickFunc, imgString, direction)
}

export const zoomMapInOnCoordinate = async (location: Coordinate): Promise<void> => {
    await mapService.zoomMapInOnCoordinate(location)
}

export const setActiveTrip = async (id: string): Promise<void> => {
    await mapService.setActiveTrip(id)
}
