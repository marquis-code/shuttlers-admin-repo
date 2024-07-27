import { LatLng, MapService } from './interface/index'
import { Coordinate } from './types'
import { ShouldUseGoogleMaps } from '@/composables/flagging/flags'

export let map
const mapType = ShouldUseGoogleMaps() ? 'google' : 'osm'
export const mapService = new MapService(mapType)

export const loading = ref(false)

export const calculateCenterAndZoom = async (coord1: Coordinate, coord2: Coordinate) => {
    mapService.calculateCenterAndZoom(coord1, coord2)
}

export const initMap = async (mapDiv: Ref, mapId: string | null = null) => {
mapService.initMap(mapDiv, mapId)
}

export const getPathFromPolyline = async (overviewPolyline) => {
    if (typeof overviewPolyline !== 'string') return
    const encodedPolyline = JSON.parse(overviewPolyline)

    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
    return encoding.decodePath(encodedPolyline.points)
}

export const loadPolyline = async (pathLine: LatLng[]): Promise<void> => {
    mapService.loadPolyline(pathLine)
}

export const loadBusstops = async (stops: Record<string, any>[]): Promise<void> => {
  mapService.loadBusstops(stops)
}

export const addPointOnMap = async (location: Coordinate) => {
mapService.addPointOnMap(location)
}
